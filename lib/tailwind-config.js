import customConfig from 'tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

const tailwindConfig = resolveConfig(customConfig)

export { tailwindConfig }
