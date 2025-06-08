
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  MousePointer, 
  Type, 
  Square, 
  ToggleLeft, 
  Menu,
  Star,
  Bell,
  Calendar,
  Loader
} from "lucide-react";
import { componentConfigs } from "@/config/components";
import { motion } from "framer-motion";

interface ComponentSidebarProps {
  selectedComponent: string;
  onSelectComponent: (component: string) => void;
}

const iconMap = {
  MousePointer,
  Type,
  Square,
  Star,
  ToggleLeft,
  Bell,
  Calendar,
  Loader,
};

export function ComponentSidebar({ selectedComponent, onSelectComponent }: ComponentSidebarProps) {
  const categories = [...new Set(componentConfigs.map(c => c.category))];

  return (
    <Sidebar className="w-64 border-r bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <SidebarContent className="p-4">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
                {category}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {componentConfigs
                    .filter(comp => comp.category === category)
                    .map((component, index) => {
                      const IconComponent = iconMap[component.icon as keyof typeof iconMap] || Star;
                      return (
                        <motion.div
                          key={component.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                        >
                          <SidebarMenuItem>
                            <SidebarMenuButton 
                              onClick={() => onSelectComponent(component.id)}
                              className={`w-full justify-start p-3 rounded-lg transition-all ${
                                selectedComponent === component.id 
                                  ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700" 
                                  : "hover:bg-slate-50 dark:hover:bg-slate-800"
                              }`}
                            >
                              <IconComponent className="h-4 w-4 mr-3" />
                              <span className="font-medium">{component.name}</span>
                              {component.isCustom && (
                                <span className="ml-auto text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-1 rounded">
                                  New
                                </span>
                              )}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </motion.div>
                      );
                    })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </motion.div>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
