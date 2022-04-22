const addCopyrightInfo = () => {
    navigator.clipboard.readText()
        .then(copiedText =>
            navigator.clipboard.writeText(
                copiedText + '\n\n\n Copyright reserved by 小霸王汪哈哈.'
            ))
}

export {
    addCopyrightInfo
}
