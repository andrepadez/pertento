export const ThemeToggle = () => {
  return (
    <div>
      <i class="block size-6 text-black dark:hidden" data-lucide="moon"></i>
      <i class="hidden size-6 text-white dark:block" data-lucide="sun"></i>
      <script src="/dark-mode.js"></script>
    </div>
  );
};
