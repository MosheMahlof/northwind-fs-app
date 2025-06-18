import React, { useState, useMemo } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  Box,
  useTheme,
} from "@mui/material";
import type { Product } from "../types";
import { useUIContext } from "../context/UIContext";

interface ProductSearchProps {
  products: Product[];
  onSearch: (searchTerm: string) => void;
}

export const ProductSearchAutocomplete = ({
  products,
  onSearch,
}: ProductSearchProps) => {
  const theme = useTheme();
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { isDarkMode, isMobile } = useUIContext();

  const suggestions = useMemo(() => {
    if (!input) return [];
    const lower = input.toLowerCase();
    const nameMatches = products
      .map((p) => p.productName)
      .filter((name) => name.toLowerCase().includes(lower));
    const categoryMatches = products
      .map((p) => p.categoryName)
      .filter((cat) => cat?.toLowerCase().includes(lower));
    // Remove duplicates
    return Array.from(new Set([...nameMatches, ...categoryMatches]));
  }, [input, products]);

  // Notify parent of search term change
  React.useEffect(() => {
    onSearch(input);
  }, [input, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div style={{ position: "relative", maxWidth: isMobile ? 280 : 350 }}>
      <input
        type="text"
        placeholder="Search Product"
        value={input}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        style={{
          width: isMobile ? "280px" : "350px",
          padding: "8px",
          fontSize: "1rem",
          borderRadius: 4,
          boxSizing: "border-box",
        }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <Paper
          style={{
            position: "absolute",
            zIndex: 5,
            left: 0,
            right: 0,
            overflowY: "auto",
          }}
        >
          <Box sx={{ maxHeight: 400, overflowY: "auto", width: "100%" }}>
            <List dense>
              {suggestions.map((s, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton onMouseDown={() => handleSuggestionClick(s)}>
                    {s}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default ProductSearchAutocomplete;
