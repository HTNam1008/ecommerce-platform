import { Search } from "lucide-react";

type SearchBarHeaderProps = {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export default function SearchBarHeader({
    placeholder = "Search",
    value,
    onChange,
}: SearchBarHeaderProps) {
    return (
        <div className="w-full max-w-md mx-4">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 focus-within:ring-gray-300">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
            </div>
        </div>
    );
}
