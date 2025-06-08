import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedCard } from "@/components/AnimatedCard";
import { motion } from "framer-motion";

interface ComponentPreviewProps {
  componentType: string;
  props: any;
}

export function ComponentPreview({
  componentType,
  props,
}: ComponentPreviewProps) {
  const renderComponent = () => {
    switch (componentType) {
      case "animatedcard":
        return (
          <AnimatedCard
            title={props.title}
            description={props.description}
            content={props.content}
            variant={props.variant}
            delay={props.delay}
          />
        );

      case "button":
        return (
          <Button
            variant={props.variant}
            size={props.size}
            disabled={props.disabled}
          >
            {props.children}
          </Button>
        );

      case "input":
        return (
          <Input
            placeholder={props.placeholder}
            disabled={props.disabled}
            type={props.type}
            className="w-64"
          />
        );

      case "card":
        return (
          <Card className="w-80">
            <CardHeader>
              <CardTitle>{props.title}</CardTitle>
              <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{props.content}</p>
            </CardContent>
          </Card>
        );

      case "badge":
        return <Badge variant={props.variant}>{props.children}</Badge>;

      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch disabled={props.disabled} defaultChecked={props.checked} />
            <span>{props.label}</span>
          </div>
        );

      case "alert":
        return (
          <Alert className="w-96">
            <AlertDescription>{props.message}</AlertDescription>
          </Alert>
        );

      case "calendar":
        return <Calendar mode="single" className="rounded-md border" />;

      case "skeleton":
        return (
          <div className="space-y-2">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        );

      default:
        return <div>Component not found</div>;
    }
  };

  return (
    <motion.div
      className="component-preview animation-safe-zone"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="component-wrapper">
        <motion.div
          className="flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {renderComponent()}
        </motion.div>
      </div>
    </motion.div>
  );
}
