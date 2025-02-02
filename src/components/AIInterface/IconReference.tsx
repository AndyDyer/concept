import React from 'react';
import { ScrollArea } from '../ui/scroll-area.tsx';
import icons from '../../icons.tsx';

const IconReference: React.FC = () => {
  return (
    <ScrollArea className="h-[calc(100vh-15rem)]">
      <div className="space-y-8 p-4">
        {Object.entries(icons).map(([category, subcategories]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-4 capitalize">
              {category.replace(/_/g, ' ')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(subcategories).map(([key, { description, icon }]) => (
                <div key={key} className="flex items-center gap-3 p-2 rounded-lg border">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{key.replace(/_/g, ' ')}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {description.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default IconReference;