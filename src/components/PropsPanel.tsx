import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sliders } from "lucide-react";

interface PropsPanelProps {
  componentType: string;
  props: any;
  onPropsChange: (newProps: any) => void;
}

export function PropsPanel({
  componentType,
  props,
  onPropsChange,
}: PropsPanelProps) {
  const updateProp = (key: string, value: any) => {
    onPropsChange({ ...props, [key]: value });
  };

  const renderControls = () => {
    switch (componentType) {
      case "button":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="variant">Variant</Label>
              <Select
                value={props.variant}
                onValueChange={(value) => updateProp("variant", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Select
                value={props.size}
                onValueChange={(value) => updateProp("size", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                  <SelectItem value="icon">Icon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="children">Text</Label>
              <Input
                id="children"
                value={props.children}
                onChange={(e) => updateProp("children", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={props.disabled}
                onCheckedChange={(checked) => updateProp("disabled", checked)}
              />
              <Label>Disabled</Label>
            </div>
          </>
        );

      case "input":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={props.placeholder || ""}
                onChange={(e) => updateProp("placeholder", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={props.type || "text"}
                onValueChange={(value) => updateProp("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={props.disabled || false}
                onCheckedChange={(checked) => updateProp("disabled", checked)}
              />
              <Label>Disabled</Label>
            </div>
          </>
        );

      case "card":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={props.title || "Card Title"}
                onChange={(e) => updateProp("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={props.description || "Card description"}
                onChange={(e) => updateProp("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={props.content || "Card content goes here..."}
                onChange={(e) => updateProp("content", e.target.value)}
              />
            </div>
          </>
        );

      case "badge":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="variant">Variant</Label>
              <Select
                value={props.variant || "default"}
                onValueChange={(value) => updateProp("variant", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="children">Text</Label>
              <Input
                id="children"
                value={props.children || "Badge"}
                onChange={(e) => updateProp("children", e.target.value)}
              />
            </div>
          </>
        );

      case "switch":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={props.label || "Enable notifications"}
                onChange={(e) => updateProp("label", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={props.checked || false}
                onCheckedChange={(checked) => updateProp("checked", checked)}
              />
              <Label>Checked by default</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={props.disabled || false}
                onCheckedChange={(checked) => updateProp("disabled", checked)}
              />
              <Label>Disabled</Label>
            </div>
          </>
        );

      case "alert":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={props.message || "This is an alert message."}
                onChange={(e) => updateProp("message", e.target.value)}
              />
            </div>
          </>
        );

      default:
        return (
          <p className="text-muted-foreground">
            No props available for this component.
          </p>
        );
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sliders className="h-5 w-5" />
          Props Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{renderControls()}</CardContent>
    </Card>
  );
}
