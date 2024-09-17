type AdaptiveValueProps = {
    startSize: number; // Starting size (e.g., 120px)
    minSize: number; // Minimum size (e.g., 80px)
    maxWidth: number; // Max width for applying scaling
    type?: number; // Type of scaling: 1, 2, or 3 as in your SCSS
};

export const getAdaptiveValue = ({ startSize, minSize, maxWidth, type = 1 }: AdaptiveValueProps): string => {
    const addSize = startSize - minSize;
    const viewportWidth = window.innerWidth;

    if (type === 1) {
        // Adjust only for smaller widths than maxWidth
        if (viewportWidth <= maxWidth) {
            return `${minSize + addSize * ((viewportWidth - 375) / (maxWidth - 375))}`;
        }
        return `${startSize}`;
    } else if (type === 2) {
        // Adjust only for larger widths than maxWidth
        if (viewportWidth >= maxWidth) {
            return `${minSize + addSize * ((viewportWidth - 375) / (maxWidth - 375))}`;
        }
        return `${startSize}`;
    } else {
        // Adjust for all screen sizes
        return `${minSize + addSize * ((viewportWidth - 375) / (maxWidth - 375))}`;
    }
};
