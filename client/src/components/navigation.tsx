import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";

export function Navigation() {
  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Logo
                </span>
              </a>
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <Link href="/">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">Home</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/medicos">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">Médicos</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/clinicas">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">Clínicas</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/hospitais">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">Hospitais</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/centro-saude">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">Centro de Saúde</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/delegacia-saude">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">Delegacia de Saúde</Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}