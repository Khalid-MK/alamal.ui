export const availableThemes: string[] = ["default", "green", "red", "dark"]

export const useTheme = () => {


    const theme = useCookie<string>('theme', { default: () => 'default' })

    const setTheme = (name: string) => {
        theme.value = name
        // Remove all theme classes
        availableThemes.forEach(theme => {
            document.documentElement.classList.remove(`theme-${theme}`)
        })

        document.documentElement.classList.add(`theme-${name}`)
        localStorage.setItem("theme", name);
    }

    onMounted(() => {
        if (theme.value)
            document.documentElement.classList.add(`theme-${theme.value}`)
    })

    return { theme, setTheme }
}