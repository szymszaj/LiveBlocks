
export interface ComponentConfig {
  id: string;
  name: string;
  icon: any;
  category: string;
  props: Record<string, any>;
  isCustom?: boolean;
}

export const componentConfigs: ComponentConfig[] = [
  {
    id: "button",
    name: "Button",
    icon: "MousePointer",
    category: "Basic",
    props: {
      variant: "default",
      size: "default",
      disabled: false,
      children: "Click me"
    }
  },
  {
    id: "input",
    name: "Input",
    icon: "Type",
    category: "Basic",
    props: {
      placeholder: "Enter text...",
      disabled: false,
      type: "text"
    }
  },
  {
    id: "animatedcard",
    name: "Animated Card",
    icon: "Star",
    category: "Animated",
    props: {
      title: "Amazing Card",
      description: "This card has cool animations",
      content: "Watch me move and dance!",
      variant: "hover",
      delay: 0
    },
    isCustom: true
  },
  {
    id: "card",
    name: "Card",
    icon: "Square",
    category: "Basic",
    props: {
      title: "Card Title",
      description: "Card description",
      content: "Card content goes here"
    }
  },
  {
    id: "badge",
    name: "Badge",
    icon: "Tag",
    category: "Basic",
    props: {
      variant: "default",
      children: "Badge"
    }
  },
  {
    id: "switch",
    name: "Switch",
    icon: "ToggleLeft",
    category: "Basic",
    props: {
      disabled: false,
      checked: false,
      label: "Toggle me"
    }
  },
  {
    id: "alert",
    name: "Alert",
    icon: "AlertCircle",
    category: "Basic",
    props: {
      message: "This is an alert message"
    }
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: "Calendar",
    category: "Basic",
    props: {}
  },
  {
    id: "skeleton",
    name: "Skeleton",
    icon: "Loader",
    category: "Basic",
    props: {}
  }
];

export function addCustomComponent(config: ComponentConfig) {
  componentConfigs.push({ ...config, isCustom: true });
}
