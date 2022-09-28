import resolveConfig from 'tailwindcss/resolveConfig'

import customConfig from 'tailwind.config'

const tailwindConfig = resolveConfig(customConfig)

export { tailwindConfig }
