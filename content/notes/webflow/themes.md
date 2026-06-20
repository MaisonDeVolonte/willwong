# Component Instance Theming via Custom Attributes + Code
Since native Webflow Variable Modes have usage limits and are designed for global theming, e.g. light/dark mode, we can use custom attributes and code for one-off component tweaks, enabling a completely free, infinite theming workaround without bloating your core design system.

## Steps
1. Make sure your component uses css variables
2. Go to **Component > Settings > Add Attribute**
   - **Name:** `data-[attribute]` *(e.g. `data-page`)*
3. Click purple 'connect property' icon
4. Click 'new plain text property'
   - **Name:** `[Attribute]` *(e.g. `Page`)*
   - **Default:** `default`
5. Exit to **Component > Properties > [Attribute]**
6. Change the `[Attribute]` value to `[variant]` *(e.g. `home`)*
7. Add custom code targeting `data-[attribute]="[variant]"`:

```html
<style>
  .header[data-page="home"] {
    --header-bg: var(--transparent);
    --header-brand: var(--bg-light);
    --header-text: var(--text-light);
    --header-cta-text: var(--text-dark);
    --header-hover: rgba(255, 255, 255, 0.1);
  }
</style>
```
