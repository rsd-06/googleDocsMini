"use client";

import React from "react";

import { useSearchParam } from "@/hooks/use-search-param";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SearchIcon, XIcon } from "lucide-react";

export const SearchInput = () => {

    const [search, setSearch] = useSearchParam("search");

    const [value, setValue] = React.useState(search);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleClear = () => {
        setValue("");
        setSearch("");
        inputRef.current?.blur();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(value);
        inputRef.current?.blur();
    };

    return (
        <div className="flex-1 flex items-center justify-center">
            <form
                className="relative w-full max-w-[720px]"
                onSubmit={handleSubmit}
            >
                <Input 
                    placeholder="Search"
                    className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15) bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white ]"

                    value={value}
                    ref={inputRef}
                    onChange={handleChange}

                />
                <Button 
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
                >
                    <SearchIcon />
                </Button>
                
                {value &&
                    <Button 
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"

                        onClick={handleClear}
                    >
                        <XIcon />
                    </Button>
                }
            </form>
        </div>
    );
}; 