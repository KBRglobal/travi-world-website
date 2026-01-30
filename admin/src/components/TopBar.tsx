import { Save, CheckCircle, Loader2 } from 'lucide-react';

interface TopBarProps {
  title: string;
  saving?: boolean;
  saved?: boolean;
  onSave?: () => void;
  children?: React.ReactNode;
}

export default function TopBar({ title, saving, saved, onSave, children }: TopBarProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="flex items-center gap-4">
        {children}
        {saving && (
          <span className="text-sm text-yellow-400 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </span>
        )}
        {saved && !saving && (
          <span className="text-sm text-green-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Saved
          </span>
        )}
        {onSave && (
          <button onClick={onSave} disabled={saving} className="btn-primary">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        )}
      </div>
    </header>
  );
}
