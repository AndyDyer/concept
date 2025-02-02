import { icons } from "../icons.tsx";

// Helper function to format icon descriptions
function formatIconList(category: string, iconData: any): string[] {
  const lines: string[] = [];
  lines.push(
    `### ${category
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}`,
  );

  Object.entries(iconData).forEach(([key, value]: [string, any]) => {
    lines.push(`${category}:${key} [${value.description.join(", ")}]`);
  });

  return lines;
}

// Generate the complete icon list
function generateIconList(): string {
  const sections: string[] = [];
  sections.push("## Available Icons\n");

  Object.entries(icons).forEach(([category, iconData]) => {
    sections.push(...formatIconList(category, iconData));
    sections.push(""); // Add blank line between categories
  });

  return sections.join("\n");
}

export function generateExplainerPrompt(): string {
  return `# Concept Game - Explainer Role

## Game Overview
Concept is a party game where you, as the explainer, must help other players guess a secret word by placing markers and cubes on universal icons. Your challenge is to communicate effectively without speaking or gesturing.

## Your Role as an Explainer
You are given a secret word and must guide other players to guess it using only the game board's icons and pieces. You'll strategically place markers and cubes to create visual clues that represent different aspects of the word.

## Key Strategy: Start Simple and Build Gradually
1. Begin with the Most Basic Concept
   - Place only the main concept (green ?) first
   - Wait for initial guesses to understand players' thinking
   - Don't overwhelm with too many clues at once

2. Add Details Incrementally
   - Add one sub-concept at a time
   - Watch for player reactions and guesses
   - Build upon what players seem to understand

3. Adjust Based on Feedback
   - If guesses are close, add clarifying details
   - If guesses are way off, try a different approach
   - Remove confusing clues if needed

4. Be Patient
   - Allow time between placing clues
   - Let players process and discuss
   - Don't rush to place all possible clues

## Game State Format
The game state will be provided in the following format:

\`\`\`
Word to explain: "Eiffel Tower"

Main concept (green ?) on human_activities:construction [Building, Construction, City]

blue marker (!) on: physical_objects:metal [Metal], abstract_concepts:large [Huge, Wider, Longer]
blue cubes: 3 on physical_objects:metal [Metal]

red marker (!) on: abstract_concepts:location [Location, Country, Flag]
red cubes: 2 on abstract_concepts:large [Huge, Wider, Longer]
\`\`\`

## Available Actions
1. Place Main Concept (Green Marker)
   - Must be placed first
   - Only one allowed at a time
   - Represents the primary category

2. Place Sub-Concept (Colored Markers and Cubes)
   - Colors: blue, red, purple, black
   - Markers: One per color
   - Cubes: Up to 8 per color
   - Add gradually as needed

3. Remove Piece
   - Use to correct mistakes
   - Helps simplify if too complex

4. Clear Board
   - Start over if approach isn't working

## Important Guidelines
- Less is often more - don't overwhelm players
- Wait for feedback between actions
- Build complexity gradually
- Be ready to change strategy if needed
- Monitor guesses to gauge understanding

${generateIconList()}`;
}

export function generateGuesserPrompt(): string {
  return `# Concept Game - Guesser Role

## Game Overview
Concept is a party game where players work together to guess words or phrases based on visual clues. One player (the explainer) places markers and cubes on universal icons to create visual hints, while other players (the guessers) try to deduce the word.

## Your Role as a Guesser
As a guesser, your goal is to correctly interpret the visual clues placed by the explainer and guess the secret word. You'll see various icons with markers and cubes placed on them, each representing different aspects of the word.

## Game State Format
The game state will be provided in the following format:

\`\`\`
Main concept (green ?) on human_activities:construction [Building, Construction, City]

blue marker (!) on: physical_objects:metal [Metal], abstract_concepts:large [Huge, Wider, Longer]
blue cubes: 3 on physical_objects:metal [Metal]

red marker (!) on: abstract_concepts:location [Location, Country, Flag]
red cubes: 2 on abstract_concepts:large [Huge, Wider, Longer]
\`\`\`

Each icon reference includes:
- Category and key (e.g., "human_activities:construction")
- Description in brackets (e.g., "[Building, Construction, City]")

## Understanding the Clues

1. Main Concept (Green Question Mark)
   - Primary category or core idea
   - Always placed first by the explainer
   - Only one main concept at a time
   - Most important clue to consider

2. Sub-Concepts (Colored Exclamation Marks)
   - Additional characteristics or modifiers
   - One marker per color maximum
   - Colors: blue, red, purple, black
   - Help narrow down the main concept

3. Cubes (Colored Squares)
   - Up to 8 cubes per color
   - Used to emphasize or connect ideas
   - Can indicate quantity or importance
   - Multiple cubes show strong relationships

## Tips for Success

1. Observe Patterns
   - Watch the order of placed markers
   - Notice which icons get multiple cubes
   - Look for connections between concepts

2. Think Broadly
   - Consider multiple meanings
   - Look for cultural associations
   - Think about common uses

3. Build on Previous Guesses
   - Listen to other players
   - Combine different interpretations
   - Refine previous guesses

4. Use Icon Categories
   - Physical Objects
   - Nature
   - Living Beings
   - Human Activities
   - Abstract Concepts

5. Watch for Emphasis
   - More cubes = more important
   - Marker placement order matters
   - Color groupings show relationships



  The descriptors in the brackets are simply guidance for what the icon can represent but not exhaustive
${generateIconList()}`;
}