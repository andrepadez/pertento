import { FileDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent } from 'shadcn/dropdown-menu';
import { DropdownMenuItem, DropdownMenuLabel } from 'shadcn/dropdown-menu';
import { DropdownMenuSeparator, DropdownMenuTrigger } from 'shadcn/dropdown-menu';
import { useDataExport } from './useDataExport';

export const ExportDropdown = ({ data, categories, chartRef }) => {
  const { exportCSV, exportPNG } = useDataExport(data, categories, chartRef);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FileDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Export to:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={exportCSV}>CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={exportPNG}>PNG</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
