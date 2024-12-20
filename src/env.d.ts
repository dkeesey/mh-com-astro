/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/middleware" />

declare namespace App {
  interface Locals {
    cspNonce: string;
  }
}
