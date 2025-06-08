import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CodePanelProps {
  componentType: string;
  props: any;
}

export function CodePanel({ componentType, props }: CodePanelProps) {
  const generateCode = (format: "jsx" | "tsx" | "snippet") => {
    const formatProps = (props: any) => {
      return Object.entries(props)
        .filter(
          ([key, value]) =>
            value !== false && value !== "" && value !== "default"
        )
        .map(([key, value]) => {
          if (typeof value === "boolean") {
            return value ? key : "";
          }
          if (typeof value === "string") {
            return `${key}="${value}"`;
          }
          return `${key}={${JSON.stringify(value)}}`;
        })
        .filter(Boolean)
        .join(" ");
    };

    const propsString = formatProps(props);
    const componentName =
      componentType.charAt(0).toUpperCase() + componentType.slice(1);

    switch (format) {
      case "jsx":
        return `import { ${componentName} } from "@/components/ui/${componentType}";

export function Example() {
  return (
    <${componentName}${propsString ? ` ${propsString}` : ""}>
      ${props.children || props.title || "Content"}
    </${componentName}>
  );
}`;

      case "tsx":
        return `import { ${componentName} } from "@/components/ui/${componentType}";


export function Example({}: ExampleProps) {
  return (
    <${componentName}${propsString ? ` ${propsString}` : ""}>
      ${props.children || props.title || "Content"}
    </${componentName}>
  );
}`;

      case "snippet":
        return `<${componentName}${propsString ? ` ${propsString}` : ""}>
  ${props.children || props.title || "Content"}
</${componentName}>`;

      default:
        return "";
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard!",
      description: "Code snippet has been copied to your clipboard.",
    });
  };

  const exportToCodeSandbox = () => {
    const code = generateCode("jsx");
    const sandboxUrl = `https://codesandbox.io/s/new?file=/src/Example.jsx&code=${encodeURIComponent(
      code
    )}`;
    window.open(sandboxUrl, "_blank");
  };

  return (
    <div className="border-t bg-[#080D12]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Generated Code</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={exportToCodeSandbox}>
              <ExternalLink className="h-4 w-4 mr-2" />
              CodeSandbox
            </Button>
          </div>
        </div>

        <Tabs defaultValue="snippet" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="snippet">Snippet</TabsTrigger>
            <TabsTrigger value="jsx">JSX</TabsTrigger>
            <TabsTrigger value="tsx">TSX</TabsTrigger>
          </TabsList>

          {["snippet", "jsx", "tsx"].map((format) => (
            <TabsContent key={format} value={format}>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">
                      {format.toUpperCase()} Code
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(generateCode(format as any))
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{generateCode(format as any)}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
