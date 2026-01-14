import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, X, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/use-debounce";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const navigate = useNavigate();
  const { user, isAdmin, isEditor, signOut } = useAuth();
  const { categories } = useCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedSearch.trim()) {
      navigate(`/?search=${encodeURIComponent(debouncedSearch.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/sobre", label: "Sobre" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Imersão Completa
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Categorias <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover border border-border">
              {categories?.map((category) => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link to={`/categoria/${category.slug}`} className="cursor-pointer">
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
            className="hidden md:flex"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Auth Buttons */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border border-border">
                {(isAdmin || isEditor) && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer">
                      Painel Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" size="sm" className="hidden md:flex">
              <Link to="/entrar">Entrar</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="Buscar artigos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </form>

                {/* Mobile Nav Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium py-2 border-b border-border"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Categories */}
                <div className="py-2">
                  <span className="text-sm font-semibold text-muted-foreground">Categorias</span>
                  <div className="flex flex-col space-y-2 mt-2">
                    {categories?.map((category) => (
                      <Link
                        key={category.id}
                        to={`/categoria/${category.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Auth */}
                {user ? (
                  <>
                    {(isAdmin || isEditor) && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium py-2 border-b border-border"
                      >
                        Painel Admin
                      </Link>
                    )}
                    <Button onClick={() => { signOut(); setIsOpen(false); }} variant="outline">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <Button asChild>
                    <Link to="/entrar" onClick={() => setIsOpen(false)}>
                      Entrar
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Search Bar */}
      {showSearch && (
        <div className="hidden md:block border-t border-border bg-background/95 backdrop-blur">
          <div className="container py-3">
            <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
              <Input
                type="search"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-20"
                autoFocus
              />
              <div className="absolute right-0 top-0 flex">
                <Button type="submit" variant="ghost" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearch(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
