import React from "react";
import {
  Box,
  Circle,
  Triangle,
  Square,
  Star,
  Cylinder,
  Pyramid,
  MoreHorizontal as LineHorizontal,
  Waves as Wave,
  SprayCan as Spiral,
  Wrench,
  Scissors,
  Droplet,
  Flame,
  Globe,
  Wind,
  Cloud,
  Zap,
  Sun,
  Moon,
  Timer,
  Calendar,
  Ear,
  Eye,
  DoorClosed as Nose,
  MessageCircle,
  Users,
  Rabbit,
  PawPrint as Lion,
  Leaf,
  Briefcase,
  Pill,
  Music,
  Dice1 as Dice,
  Trophy,
  Tv,
  Book,
  Car,
  Ship,
  Plane,
  Lightbulb,
  MessageSquare,
  Smile,
  Frown,
  HeartPulse,
  Skull,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Maximize,
  Minimize,
  CircleOff,
  CircleDot,
  Grid,
  Laptop,
  Cog,
  Coins,
  Crown,
  Cross,
  MapPin,
  FlaskRound as Flask,
  Turtle,
  Scroll,
  Shirt,
  ScanLine as BrokenLine,
  Blocks as Cube,
  Axe as Wood,
  Wrench as Metal,
  Droplets as Plastic,
  Mountain as Rock,
  FileText as Paper,
  Shirt as Fabric,
  CircleDot as Sphere,
  Cone,
  Users as Male,
  UserSquare as Female,
  Baby as Young,
  UserCog as Adult,
  Brain as Head,
  Heart as Torso,
  Hand as Arms,
  Footprints as Legs,
  Construction,
  Camera as Performance,
  PaintBucket as Visual,
  Package,
  Home,
  Sword,
  Shield,
  BellRing as Ring,
  Infinity as Cycle,
  CircleDot as Hollow,
  ArrowUpWideNarrow as Tall,
  ArrowDownWideNarrow as Short,
  ArrowRightFromLine as Activate,
  Glasses as Clear,
  Gift as Present,
  History as Reality,
  Wand2 as Fiction,
  Circle as ColorCircle,
} from "lucide-react";

const iconStyle = {
  strokeWidth: 1.5,
  size: 32,
};

// Background colors - lighter, vibrant versions
const bgColorMap = {
  blue: "#e0f2fe", // Light blue
  red: "#fee2e2", // Light red
  yellow: "#fef3c7", // Light yellow
  green: "#dcfce7", // Light green
  purple: "#f3e8ff", // Light purple
  pink: "#fce7f3", // Light pink
  gray: "#f3f4f6", // Light gray
  orange: "#fff7ed", // Light orange
  brown: "#fef3c7", // Light brown
  white: "#ffffff", // Pure white
  black: "#3b3b3b", // Very light gray
  nature: "#f0fdf4", // Pale nature green
  tech: "#f0f9ff", // Pale tech blue
  abstract: "#faf5ff", // Pale abstract purple
  human: "#fff1f2", // Pale human pink
};

const colorMap = {
  blue: "#3b82f6", // Blue
  red: "#ef4444", // Red
  yellow: "#f59e0b", // Amber
  green: "#10b981", // Emerald
  purple: "#8b5cf6", // Violet
  pink: "#ec4899", // Pink
  gray: "#6b7280", // Gray
  orange: "#f97316", // Orange
  brown: "#92400e", // Brown
  white: "#f8fafc", // White
  black: "#1e293b", // Black
};

export const icons = {
  physical_objects: {
    // Materials
    wood: {
      description: ["Wood"],
      icon: <Wood {...iconStyle} color={colorMap.brown} />,
      backgroundColor: bgColorMap.brown,
    },
    metal: {
      description: ["Metal"],
      icon: <Metal {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },
    plastic: {
      description: ["Plastic", "Rubber"],
      icon: <Plastic {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.blue,
    },
    rock: {
      description: ["Rock", "Mineral", "Hard"],
      icon: <Rock {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },
    paper: {
      description: ["Paper", "Sheet"],
      icon: <Paper {...iconStyle} color={colorMap.white} />,
      backgroundColor: bgColorMap.black,
    },
    fabric: {
      description: ["Fabric", "Flat"],
      icon: <Fabric {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.purple,
    },
    package: {
      description: ["Object", "Thing", "Package"],
      icon: <Package {...iconStyle} color={colorMap.brown} />,
      backgroundColor: bgColorMap.brown,
    },

    // Basic Shapes
    circle: {
      description: ["Circle", "Button"],
      icon: <Circle {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.blue,
    },
    triangle: {
      description: ["Triangle"],
      icon: <Triangle {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.red,
    },
    rectangle: {
      description: ["Rectangle", "Square"],
      icon: <Square {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.yellow,
    },
    star: {
      description: ["Star"],
      icon: <Star {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.yellow,
    },
    sphere: {
      description: ["Sphere"],
      icon: <Sphere {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.blue,
    },
    cube: {
      description: ["Cube", "Brick"],
      icon: <Cube {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },
    cylinder: {
      description: ["Cylinder"],
      icon: <Cylinder {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },
    cone: {
      description: ["Cone"],
      icon: <Cone {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.yellow,
    },
    pyramid: {
      description: ["Pyramid"],
      icon: <Pyramid {...iconStyle} color={colorMap.orange} />,
      backgroundColor: bgColorMap.orange,
    },
    ring: {
      description: ["Ring", "Cycle"],
      icon: <Ring {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.yellow,
    },
    hollow: {
      description: ["Hollow", "Hole", "Pierced"],
      icon: <Hollow {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },

    // Lines and Patterns
    straight_line: {
      description: ["Straight line", "Smooth", "Rise"],
      icon: <LineHorizontal {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },
    broken_line: {
      description: ["Broken line", "Sharp", "Uneven"],
      icon: <BrokenLine {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.red,
    },
    curve: {
      description: ["Curve", "Arc", "Rounded"],
      icon: <Wave {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.blue,
    },
    spiral: {
      description: ["Spiral", "Intoxication/Madness", "Coil"],
      icon: <Spiral {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.purple,
    },
    sinusoidal: {
      description: ["Sinusoidal", "Ripple", "Hair"],
      icon: (
        <Wave {...iconStyle} color={colorMap.blue} transform="rotate(90)" />
      ),
      backgroundColor: bgColorMap.blue,
    },
    cross: {
      description: ["Cross", "Intersection", "Addition"],
      icon: <Cross {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.blue,
    },
    grid: {
      description: ["Grid", "Network", "Prison"],
      icon: <Grid {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },
    turn: {
      description: ["Turn", "Surround", "Cycle"],
      icon: <Cycle {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.purple,
    },
  },

  nature: {
    // Elements
    water: {
      description: ["Water", "Liquid", "Aquatic"],
      icon: <Droplet {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.blue,
    },
    fire: {
      description: ["Fire", "Burn", "Heat"],
      icon: <Flame {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.red,
    },
    earth: {
      description: ["Earth", "Dirt", "Grow"],
      icon: <Globe {...iconStyle} color={colorMap.green} />,
      backgroundColor: bgColorMap.nature,
    },
    air: {
      description: ["Air", "Wind", "Blow"],
      icon: <Wind {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },

    // Weather
    cloud: {
      description: ["Cloud", "Rain", "Snow/Cold"],
      icon: <Cloud {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },
    lightning: {
      description: ["Lightning/Electricity", "Storm", "Anger"],
      icon: <Zap {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.yellow,
    },

    // Celestial
    sun: {
      description: ["Sun/Heat", "Light", "Daytime"],
      icon: <Sun {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.yellow,
    },
    night: {
      description: ["Night", "Evening", "Moon"],
      icon: <Moon {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.purple,
    },

    // Time
    time: {
      description: ["Time", "Duration"],
      icon: <Timer {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },
    date: {
      description: ["Date", "Event", "Daytime"],
      icon: <Calendar {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.blue,
    },
  },

  living_beings: {
    // People
    male: {
      description: ["Male/Man", "Husband", "Masculine"],
      icon: <Male {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.human,
    },
    female: {
      description: ["Female/Woman", "Wife", "Feminine"],
      icon: <Female {...iconStyle} color={colorMap.pink} />,
      backgroundColor: bgColorMap.human,
    },
    young: {
      description: ["Baby/Child", "Young", "New"],
      icon: <Young {...iconStyle} color={colorMap.pink} />,
      backgroundColor: bgColorMap.human,
    },
    adult: {
      description: ["Adult/Old", "Ancient", "Past"],
      icon: <Adult {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.human,
    },
    group: {
      description: ["Person", "Family", "Group"],
      icon: <Users {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.human,
    },

    // Body Parts
    head: {
      description: ["Head", "Face"],
      icon: <Head {...iconStyle} color={colorMap.pink} />,
      backgroundColor: bgColorMap.human,
    },
    torso: {
      description: ["Torso", "Stomach"],
      icon: <Torso {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.human,
    },
    arms: {
      description: ["Arm", "Hand"],
      icon: <Arms {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.human,
    },
    legs: {
      description: ["Leg", "Foot"],
      icon: <Legs {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.human,
    },
    ears: {
      description: ["Ear", "Sound", "Hear"],
      icon: <Ear {...iconStyle} color={colorMap.pink} />,
      backgroundColor: bgColorMap.human,
    },
    eyes: {
      description: ["Eye", "View", "Watch"],
      icon: <Eye {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.human,
    },
    nose: {
      description: ["Nose", "Odor", "Smell"],
      icon: <Nose {...iconStyle} color={colorMap.pink} />,
      backgroundColor: bgColorMap.human,
    },
    mouth: {
      description: ["Mouth", "Flavor", "Eat"],
      icon: <MessageCircle {...iconStyle} color={colorMap.pink} />,
      backgroundColor: bgColorMap.human,
    },

    // Animals
    slow: {
      description: ["Slow", "Lengthy", "Turtle"],
      icon: <Turtle {...iconStyle} color={colorMap.green} />,
      backgroundColor: bgColorMap.nature,
    },
    fast: {
      description: ["Fast", "Lively", "Hare"],
      icon: <Rabbit {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.nature,
    },
    wildlife: {
      description: ["Wildlife", "Animal"],
      icon: <Lion {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.nature,
    },
    flora: {
      description: ["Flora", "Nature", "Plant"],
      icon: <Leaf {...iconStyle} color={colorMap.green} />,
      backgroundColor: bgColorMap.nature,
    },
  },

  human_activities: {
    // Work and Professions
    work: {
      description: ["Work", "Profession", "Craft"],
      icon: <Briefcase {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.tech,
    },
    construction: {
      description: ["Building", "Construction", "City"],
      icon: <Construction {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.tech,
    },
    medical: {
      description: ["Medical", "Drug", "Cure"],
      icon: <Pill {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.tech,
    },
    tools: {
      description: ["Tools", "Construction"],
      icon: <Wrench {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.tech,
    },

    // Arts and Entertainment
    performance: {
      description: ["Theater", "Film", "Camera"],
      icon: <Performance {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.abstract,
    },
    visual: {
      description: ["Arts", "Sculpture/Painting", "Drawing/Comics"],
      icon: <Visual {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.abstract,
    },
    music: {
      description: ["Music", "Song", "Note"],
      icon: <Music {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.abstract,
    },
    games: {
      description: ["Games", "Toys", "Youth"],
      icon: <Dice {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.abstract,
    },
    sports: {
      description: ["Recreation", "Sport", "Activity"],
      icon: <Trophy {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.abstract,
    },
    television: {
      description: ["Television", "Broadcast", "Series"],
      icon: <Tv {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.abstract,
    },
    literature: {
      description: ["Literature", "Writing", "Book"],
      icon: <Book {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.abstract,
    },

    // Transportation
    land_vehicle: {
      description: ["Land vehicle", "Car", "Ride"],
      icon: <Car {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.tech,
    },
    watercraft: {
      description: ["Watercraft", "Maritime", "Swim"],
      icon: <Ship {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.tech,
    },
    airborne: {
      description: ["Airborne vehicle", "Airline", "Fly"],
      icon: <Plane {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.tech,
    },

    // Daily Life
    home: {
      description: ["Home", "Interior", "Domestic"],
      icon: <Home {...iconStyle} color={colorMap.orange} />,
      backgroundColor: bgColorMap.orange,
    },
    clothing: {
      description: ["Clothing", "Accessories", "Costume"],
      icon: <Shirt {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.purple,
    },
    holidays: {
      description: ["Holidays", "Birthday", "Celebration"],
      icon: <Present {...iconStyle} color={colorMap.pink} />,
      backgroundColor: bgColorMap.pink,
    },

    // Reality vs Fiction
    reality: {
      description: ["Reality", "History"],
      icon: <Reality {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.tech,
    },
    fictional: {
      description: ["Fictional", "Imaginary", "Wish"],
      icon: <Fiction {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.abstract,
    },
  },

  abstract_concepts: {
    // Mental and Communication
    thought: {
      description: ["Idea", "Thought", "Concept"],
      icon: <Lightbulb {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.abstract,
    },
    expression: {
      description: ["Expression/Quote", "Speak", "Word"],
      icon: <MessageSquare {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.abstract,
    },
    title: {
      description: ["Title", "Brand", "Name"],
      icon: <Scroll {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.abstract,
    },

    // Emotions
    joyous: {
      description: ["Joyous", "Positive"],
      icon: <Smile {...iconStyle} color={colorMap.green} />,
      backgroundColor: bgColorMap.green,
    },
    sad: {
      description: ["Sad", "Negative"],
      icon: <Frown {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.red,
    },
    life: {
      description: ["Life", "Heart", "Love"],
      icon: <HeartPulse {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.red,
    },
    death: {
      description: ["Death", "Evil", "Disease"],
      icon: <Skull {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },

    // Direction and Position
    top: {
      description: ["Top", "Up", "Mount"],
      icon: <ArrowUp {...iconStyle} color={colorMap.green} />,
      backgroundColor: bgColorMap.green,
    },
    low: {
      description: ["Down", "Under"],
      icon: <ArrowDown {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.red,
    },
    left: {
      description: ["Left", "First", "Before"],
      icon: <ArrowLeft {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.blue,
    },
    right: {
      description: ["Right", "End", "After"],
      icon: <ArrowRight {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.blue,
    },
    inside: {
      description: ["Inside", "Internal"],
      icon: <Box {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.abstract,
    },

    // Size and Quantity
    huge: {
      description: ["Huge", "Wider", "Longer"],
      icon: <Maximize {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.yellow,
    },
    small: {
      description: ["Small", "Lower", "Below"],
      icon: <Minimize {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },
    tall: {
      description: ["Tall", "Greater", "High"],
      icon: <Tall {...iconStyle} color={colorMap.green} />,
      backgroundColor: bgColorMap.green,
    },
    skinny: {
      description: ["Skinny", "Closer", "Brief"],
      icon: <Short {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },
    zero: {
      description: ["Zero", "Nothing", "Null"],
      icon: <CircleOff {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.red,
    },
    unity: {
      description: ["Unity", "One"],
      icon: <CircleDot {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.blue,
    },
    fragment: {
      description: ["Fragment", "Multitude", "Powder"],
      icon: <Grid {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.purple,
    },
    part: {
      description: ["Part", "Bit", "Piece"],
      icon: <Scissors {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.gray,
    },

    // Technology and Science
    electronics: {
      description: ["Electronics", "Computer"],
      icon: <Laptop {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.tech,
    },
    mechanical: {
      description: ["Mechanical", "Industrial"],
      icon: <Cog {...iconStyle} color={colorMap.gray} />,
      backgroundColor: bgColorMap.tech,
    },
    science: {
      description: ["Science", "Mathematics", "Chemistry"],
      icon: <Flask {...iconStyle} color={colorMap.green} />,
      backgroundColor: bgColorMap.tech,
    },

    // Society and Culture
    money: {
      description: ["Money", "Rich", "Expensive"],
      icon: <Coins {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.yellow,
    },
    power: {
      description: ["Power", "Politics"],
      icon: <Crown {...iconStyle} color={colorMap.yellow} />,
      backgroundColor: bgColorMap.yellow,
    },
    religion: {
      description: ["Religion", "Myth", "Belief"],
      icon: <Cross {...iconStyle} color={colorMap.purple} />,
      backgroundColor: bgColorMap.purple,
    },
    location: {
      description: ["Location", "Country", "Flag"],
      icon: <MapPin {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.red,
    },
    defense: {
      description: ["Defense", "Protection", "Wall"],
      icon: <Shield {...iconStyle} color={colorMap.blue} />,
      backgroundColor: bgColorMap.blue,
    },
    conflict: {
      description: ["Conflict", "Weapon", "Fight"],
      icon: <Sword {...iconStyle} color={colorMap.red} />,
      backgroundColor: bgColorMap.red,
    },
    activate: {
      description: ["Use/Activate", "Verb"],
      icon: <Activate {...iconStyle} color={colorMap.green} />,
      backgroundColor: bgColorMap.green,
    },
    clear: {
      description: ["Clear", "Invisible"],
      icon: <Clear {...iconStyle} color={colorMap.white} />,
      backgroundColor: bgColorMap.black,
    },
  },

  colors: {
    red: {
      description: ["Red"],
      icon: (
        <ColorCircle {...iconStyle} color={colorMap.red} fill={colorMap.red} />
      ),
      backgroundColor: bgColorMap.red,
    },
    orange: {
      description: ["Orange"],
      icon: (
        <ColorCircle
          {...iconStyle}
          color={colorMap.orange}
          fill={colorMap.orange}
        />
      ),
      backgroundColor: bgColorMap.orange,
    },
    yellow: {
      description: ["Yellow"],
      icon: (
        <ColorCircle
          {...iconStyle}
          color={colorMap.yellow}
          fill={colorMap.yellow}
        />
      ),
      backgroundColor: bgColorMap.yellow,
    },
    green: {
      description: ["Green"],
      icon: (
        <ColorCircle
          {...iconStyle}
          color={colorMap.green}
          fill={colorMap.green}
        />
      ),
      backgroundColor: bgColorMap.green,
    },
    blue: {
      description: ["Blue"],
      icon: (
        <ColorCircle
          {...iconStyle}
          color={colorMap.blue}
          fill={colorMap.blue}
        />
      ),
      backgroundColor: bgColorMap.blue,
    },
    purple: {
      description: ["Purple"],
      icon: (
        <ColorCircle
          {...iconStyle}
          color={colorMap.purple}
          fill={colorMap.purple}
        />
      ),
      backgroundColor: bgColorMap.purple,
    },
    pink: {
      description: ["Pink"],
      icon: (
        <ColorCircle
          {...iconStyle}
          color={colorMap.pink}
          fill={colorMap.pink}
        />
      ),
      backgroundColor: bgColorMap.pink,
    },
    brown: {
      description: ["Brown"],
      icon: (
        <ColorCircle
          {...iconStyle}
          color={colorMap.brown}
          fill={colorMap.brown}
        />
      ),
      backgroundColor: bgColorMap.brown,
    },
    black: {
      description: ["Black"],
      icon: (
        <ColorCircle
          {...iconStyle}
          color={colorMap.black}
          fill={colorMap.black}
        />
      ),
      backgroundColor: bgColorMap.black,
    },
    gray: {
      description: ["Gray"],
      icon: (
        <ColorCircle
          {...iconStyle}
          color={colorMap.gray}
          fill={colorMap.gray}
        />
      ),
      backgroundColor: bgColorMap.gray,
    },
    white: {
      description: ["White"],
      icon: (
        <ColorCircle
          {...iconStyle}
          color={colorMap.white}
          fill={colorMap.white}
          stroke={colorMap.gray}
        />
      ),
      backgroundColor: bgColorMap.white,
    },
  },
};

export type IconsData = typeof icons;
export default icons;
