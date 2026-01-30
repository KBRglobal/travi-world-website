interface RichEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  rows?: number;
  placeholder?: string;
}

export default function RichEditor({ value, onChange, label, rows = 8, placeholder }: RichEditorProps) {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <div className="bg-gray-700 px-3 py-1.5 border-b border-gray-600 flex gap-1">
          {['B', 'I', 'H2', 'H3', '•', '1.', '""', '</>'].map((btn) => (
            <button
              key={btn}
              type="button"
              className="px-2 py-1 text-xs font-mono text-gray-300 hover:bg-gray-600 rounded"
              onClick={() => {
                const tags: Record<string, string> = {
                  B: '**', I: '_', H2: '## ', H3: '### ',
                  '•': '- ', '1.': '1. ', '""': '> ', '</>': '`',
                };
                onChange(value + (tags[btn] || ''));
              }}
            >
              {btn}
            </button>
          ))}
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder || 'Write content here... (Markdown supported)'}
          className="w-full bg-gray-800 text-white px-4 py-3 focus:outline-none resize-y font-mono text-sm"
        />
      </div>
    </div>
  );
}
