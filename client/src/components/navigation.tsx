import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";

export function Navigation() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-2xl font-bold text-primary">SoSaúde</span>
              </a>
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/">
                  <Button variant="ghost">Home</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/medicos">
                  <Button variant="ghost">Médicos</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/clinicas">
                  <Button variant="ghost">Clínicas</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/hospitais">
                  <Button variant="ghost">Hospitais</Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
