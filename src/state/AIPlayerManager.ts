import { GameState, Player } from "../types/index.ts";
import { generateExplanation, generateGuess } from "../lib/ai.ts";
import { explainerSystemPrompt } from "../prompts/explainer.ts";
import { guesserSystemPrompt } from "../prompts/guesser.ts";

export class AIPlayerManager {
  private lastActionTime: number = 0;
  private lastExplanationTime: number = 0;
  private readonly COOLDOWN = 6000; // 6 seconds between actions
  private readonly EXPLANATION_COOLDOWN = 8000; // 8 seconds for explanations
  private readonly WRONG_GUESSES_THRESHOLD = 3;

  constructor(
    private readonly player: Player,
    private readonly placeMainConcept: (iconKey: string) => void,
    private readonly placeSubConcept: (
      iconKey: string,
      color: string,
      isMarker?: boolean,
    ) => void,
    private readonly clearBoard: () => void,
    private readonly addMessage: (message: any) => void,
    private readonly onCorrectGuess: (playerId: number) => void,
  ) {}

  private canAct(now: number, isExplainer: boolean): boolean {
    const timeSinceLastAction = now - this.lastActionTime;
    const timeSinceLastExplanation = now - this.lastExplanationTime;

    if (isExplainer) {
      return timeSinceLastExplanation >= this.EXPLANATION_COOLDOWN;
    }
    return timeSinceLastAction >= this.COOLDOWN;
  }

  async handleGameStateUpdate(
    gameState: GameState,
    boardState: any,
    chatState: any,
  ) {
    // Don't process any actions if the round is ending
    if (gameState.isRoundEnding) {
      return;
    }

    const now = Date.now();
    const isExplainer = gameState.currentExplainer?.id === this.player.id;

    // Check if enough time has passed
    if (!this.canAct(now, isExplainer)) {
      return;
    }

    // Only act if the game is started
    if (!gameState.started) {
      return;
    }

    // Add random delay between 1-2 seconds to make AI feel more natural
    const randomDelay = Math.floor(Math.random() * 1000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, randomDelay));

    // Combine states for AI processing
    const combinedState = {
      ...gameState,
      ...boardState,
      messages: chatState.messages.map((m) => m.text),
      iconsData: boardState.iconsData,
      currentAIPlayer: this.player,
    };

    try {
      if (isExplainer) {
        await this.handleExplainer(combinedState);
        this.lastExplanationTime = Date.now();
      } else {
        await this.handleGuesser(combinedState);
      }
      this.lastActionTime = Date.now();
    } catch (error) {
      console.error(`[AIPlayerManager ${this.player.name}] Error:`, error);
    }
  }

  private async handleExplainer(state: GameState) {
    // Count wrong guesses since last action
    const recentMessages = state.messages?.slice().reverse() || [];
    let wrongGuesses = 0;
    for (const msg of recentMessages) {
      if (msg.isCorrect) break;
      if (!msg.isAction && !msg.isAI) wrongGuesses++;
    }

    // Only explain if:
    // 1. No main concept is placed yet
    // 2. Several wrong guesses have accumulated
    // 3. Enough time has passed since last action
    const shouldExplain =
      !state.mainConcept || wrongGuesses >= this.WRONG_GUESSES_THRESHOLD;

    if (shouldExplain) {
      console.log(
        `[AIPlayerManager ${this.player.name}] Generating explanation`,
      );
      await generateExplanation(
        state,
        explainerSystemPrompt,
        this.placeMainConcept,
        this.placeSubConcept,
        this.clearBoard,
        this.addMessage,
      );
      this.wrongGuessCount = 0;
    }
  }

  private async handleGuesser(state: GameState) {
    // Only guess if there's something on the board
    if (!state.mainConcept) {
      return;
    }

    // Add additional delay for guessing to make it feel more natural
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`[AIPlayerManager ${this.player.name}] Generating guess`);
    await generateGuess(
      state,
      guesserSystemPrompt,
      this.addMessage,
      this.onCorrectGuess,
    );
  }
}
