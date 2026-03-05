// Configuración de niveles basada en el archivo CSV
export const LEVEL_THRESHOLDS = [
    { level: 1, min: 0, max: 100 },
    { level: 2, min: 100, max: 200 },
    { level: 3, min: 200, max: 300 },
    { level: 4, min: 300, max: 400 },
    { level: 5, min: 400, max: 500 },
    { level: 6, min: 500, max: 650 },
    { level: 7, min: 650, max: 800 },
    { level: 8, min: 800, max: 950 },
    { level: 9, min: 950, max: 1100 },
    { level: 10, min: 1100, max: 1300 },
    { level: 11, min: 1300, max: 1500 },
    { level: 12, min: 1500, max: 1750 },
    { level: 13, min: 1750, max: 2000 },
    { level: 14, min: 2000, max: 2250 },
    { level: 15, min: 2250, max: 2500 },
    { level: 16, min: 2500, max: 2750 },
    { level: 17, min: 2750, max: 3000 },
    { level: 18, min: 3000, max: 3300 },
    { level: 19, min: 3300, max: 3600 },
    { level: 20, min: 3600, max: 3900 },
    { level: 21, min: 3900, max: 4200 },
];

// Función para obtener información del nivel basado en puntos totales
export function getLevelInfo(totalPoints: number) {
    // Encontrar el nivel actual
    let currentLevelData = LEVEL_THRESHOLDS[0];

    for (const levelData of LEVEL_THRESHOLDS) {
        if (totalPoints >= levelData.min && totalPoints < levelData.max) {
            currentLevelData = levelData;
            break;
        }
        // Si los puntos son >= al máximo del último nivel, usar el último nivel
        if (levelData.level === 21 && totalPoints >= levelData.min) {
            currentLevelData = levelData;
            break;
        }
    }

    // Calcular progreso dentro del nivel actual
    const pointsInLevel = totalPoints - currentLevelData.min;
    const levelRange = currentLevelData.max - currentLevelData.min;
    const progressPercentage = Math.min((pointsInLevel / levelRange) * 100, 100);

    // Calcular puntos necesarios para el siguiente nivel
    const pointsNeeded = currentLevelData.max - totalPoints;

    // Obtener el siguiente nivel
    const nextLevel = currentLevelData.level < 21 ? currentLevelData.level + 1 : 21;

    return {
        currentLevel: currentLevelData.level,
        nextLevel,
        progressPercentage,
        pointsNeeded: Math.max(pointsNeeded, 0),
        currentLevelMin: currentLevelData.min,
        currentLevelMax: currentLevelData.max,
    };
}
