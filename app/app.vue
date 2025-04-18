<script setup lang="ts">
const devMode = useLocalStorage('dev-mode', () => false)

defineOgImage({ component: 'Default' })

useSeoMeta({
  title: 'Dev Mode - Toggle Your Developer Environment',
  description: 'Easily turn dev mode on and off from one single site.',
})

useHead({
  link: () => {
    const prefix = devMode.value ? '/on' : '/off'
    return [
      { rel: 'canonical', href: 'https://dev-mode.dev' },
      { rel: 'icon', type: 'image/png', href: prefix + '/favicon-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/svg+xml', href: prefix + '/favicon.svg' },
      { rel: 'shortcut icon', href: prefix + '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: prefix + '/apple-touch-icon.png' },
    ]
  },
})

onPrehydrate(() => {
  const stored = localStorage.getItem('dev-mode') === 'true'

  // Only make DOM changes if the stored value is true (since server always renders false)
  if (stored) {
    const toggleElement = document.querySelector('.toggle')
    if (toggleElement) {
      toggleElement.classList.add('toggle-on')
      toggleElement.setAttribute('aria-checked', 'true')
    }

    const statusElements = document.querySelectorAll('.toggle-status, .status-message span')
    statusElements.forEach((element) => {
      if (element.textContent?.includes('OFF')) {
        element.textContent = element.textContent.replace('OFF', 'ON')
      }
    })

    const statusSpan = document.querySelector('.status-message span')
    if (statusSpan) {
      statusSpan.classList.remove('off')
      statusSpan.classList.add('on')
    }
  }
})
</script>

<template>
  <div class="app-container">
    <main>
      <h1 class="title">
        dev mode
      </h1>
      <p class="subtitle">
        easily turn dev mode on and off
      </p>

      <div
        class="toggle-container"
      >
        <button
          class="toggle"
          :class="{ 'toggle-on': devMode }"
          role="switch"
          :aria-checked="devMode"
          aria-label="Toggle developer mode"
          @click="devMode = !devMode"
        >
          <div class="toggle-handle" />
        </button>
        <p
          class="toggle-status"
          aria-hidden="true"
        >
          {{ devMode ? 'ON' : 'OFF' }}
        </p>
      </div>

      <p
        class="status-message"
        aria-live="polite"
      >
        developer mode is currently <span :class="devMode ? 'on' : 'off'">{{ devMode ? 'ON' : 'OFF' }}</span>
      </p>
    </main>

    <footer>
      <a
        class="hover:underline"
        href="https://github.com/danielroe/dev-mode.dev"
        aria-label="View source code on GitHub"
      >source</a>
      &middot;
      made with ❤️ by <a
        class="font-semibold hover:underline"
        href="https://bsky.app/profile/danielroe.dev"
        aria-label="Daniel Roe on Bluesky"
      >
        @danielroe.dev
      </a>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
}

.title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #4776E6, #8E54E9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 4rem;
}

.toggle-container {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.toggle {
  width: 200px;
  display: flex;
  align-items: center;
  height: 100px;
  background-color: #e0e0e0;
  border-radius: 50px;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
}

.toggle:focus-visible {
  outline: 3px solid #8E54E9;
  outline-offset: 2px;
}

.toggle-on {
  background-color: #4776E6;
}

.toggle-handle {
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  left: 5px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.toggle-on .toggle-handle {
  left: 105px;
}

.toggle-status {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  color: #555;
}

.status-message {
  font-size: 1.2rem;
  margin-top: 2rem;
}

.on {
  color: #2759cf;
  font-weight: bold;
}

.off {
  color: #555;
  font-weight: bold;
}

footer {
  margin-top: 2rem;
  color: #888;
  font-size: 0.9rem;
  text-align: center;
}
</style>
