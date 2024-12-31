{ pkgs ? import (builtins.fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixpkgs-unstable.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_22
    pnpm
    postgresql
  ];
  shellHook = ''
    echo "Your nix shell is now configured and running..."
  '';
}