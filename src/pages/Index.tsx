import { useState } from "react";
import { ComponentSidebar } from "@/components/ComponentSidebar";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsPanel } from "@/components/PropsPanel";
import { CodePanel } from "@/components/CodePanel";
import { WindEffect } from "@/components/WindEffect";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Code, Zap, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { componentConfigs } from "@/config/components";

const Index = () => {
  const [selectedComponent, setSelectedComponent] = useState("button");
  const [componentProps, setComponentProps] = useState(
    componentConfigs.find((c) => c.id === "button")?.props || {}
  );
  const [windActive, setWindActive] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = () => {
    setWindActive(true);
    toggleTheme();
    setTimeout(() => setWindActive(false), 3000);
  };

  const handleComponentSelect = (componentId: string) => {
    setSelectedComponent(componentId);
    const component = componentConfigs.find((c) => c.id === componentId);
    if (component) {
      setComponentProps(component.props);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 transition-colors duration-1000"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <WindEffect isActive={windActive} />

      <motion.header
        className="border-b bg-slate-800/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40 border-slate-700 dark:border-slate-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  UI Playground
                </h1>
                <p className="text-sm text-slate-400">
                  Interactive Component Catalog
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center space-x-4"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleThemeChange}
                className="relative overflow-hidden border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-200"
              >
                <motion.div
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 mr-2" />
                  ) : (
                    <Moon className="h-4 w-4 mr-2" />
                  )}
                </motion.div>
                Themes
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Zap className="h-4 w-4 mr-2" />
                Export Code
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <SidebarProvider>
        <div className="flex w-full min-h-[calc(100vh-81px)]">
          <ComponentSidebar
            selectedComponent={selectedComponent}
            onSelectComponent={handleComponentSelect}
          />

          <main className="flex-1 flex">
            {/* Preview Area */}
            <div className="flex-1 p-6">
              <motion.div
                className="bg-slate-800 dark:bg-slate-900 rounded-xl shadow-lg border border-slate-700 dark:border-slate-800 h-full"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="p-6 border-b border-slate-700 dark:border-slate-800">
                  <h2 className="text-xl font-semibold capitalize text-slate-100">
                    {selectedComponent} Component
                  </h2>
                  <p className="text-slate-400">
                    Interactive preview with live props editing
                  </p>
                </div>

                <ComponentPreview
                  componentType={selectedComponent}
                  props={componentProps}
                />

                <CodePanel
                  componentType={selectedComponent}
                  props={componentProps}
                />
              </motion.div>
            </div>

            {/* Props Panel */}
            <div className="w-80 p-6">
              <PropsPanel
                componentType={selectedComponent}
                props={componentProps}
                onPropsChange={setComponentProps}
              />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </motion.div>
  );
};

export default Index;
