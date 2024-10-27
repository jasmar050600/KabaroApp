import { ref, computed, onMounted, onUnmounted } from 'vue';

export const breakpointsTailwind = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const useBreakpoints = () => {
  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);

  const updateDimensions = () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions);
  });

  const width = computed(() => windowWidth.value);
  const height = computed(() => windowHeight.value);

  const breakpoints = computed(() => ({
    xs: windowWidth.value < breakpointsTailwind.sm,
    sm: windowWidth.value >= breakpointsTailwind.sm && windowWidth.value < breakpointsTailwind.md,
    md: windowWidth.value >= breakpointsTailwind.md && windowWidth.value < breakpointsTailwind.lg,
    lg: windowWidth.value >= breakpointsTailwind.lg && windowWidth.value < breakpointsTailwind.xl,
    xl: windowWidth.value >= breakpointsTailwind.xl,
    isMobile: windowWidth.value < breakpointsTailwind.md,
    isTablet: windowWidth.value >= breakpointsTailwind.md && windowWidth.value < breakpointsTailwind.lg,
    isDesktop: windowWidth.value >= breakpointsTailwind.lg
  }));

  return {
    width,
    height,
    ...breakpoints.value
  };
};