// Configuración de niveles basada en el archivo CSV
export const LEVEL_THRESHOLDS = [
    { level: 1, min: 0, max: 150 }, // 0 a 150
    { level: 2, min: 151, max: 300 }, // 151 a 300
    { level: 3, min: 301, max: 500 },
    { level: 4, min: 501, max: 700 },
    { level: 5, min: 701, max: 900 },
    { level: 6, min: 901, max: 1100 },
    { level: 7, min: 1101, max: 1300 },
    { level: 8, min: 1301, max: 1500 },
    { level: 9, min: 1501, max: 1700 },
    { level: 10, min: 1701, max: 1900 },
    { level: 11, min: 1901, max: 2100 },
    { level: 12, min: 2101, max: 2300 },
    { level: 13, min: 2301, max: 2500 },
    { level: 14, min: 2501, max: 2700 },
    { level: 15, min: 2701, max: 2900 },
    { level: 16, min: 2901, max: 3100 },
    { level: 17, min: 3101, max: 3300 },
    { level: 18, min: 3301, max: 3500 },
    { level: 19, min: 3501, max: 3700 },
    { level: 20, min: 3701, max: 3900 },
    { level: 21, min: 3901, max: 4100 },
    { level: 22, min: 4101, max: 4300 },
    { level: 23, min: 4301, max: 4500 },
    { level: 24, min: 4501, max: 4700 },
    { level: 25, min: 4701, max: 4900 },
    { level: 26, min: 4901, max: 5100 },
    { level: 27, min: 5101, max: 5300 },
    { level: 28, min: 5301, max: 5500 }, // Corregido de 5300 a 5301 para consistencia punto a punto
    { level: 29, min: 5501, max: 5700 },
    { level: 30, min: 5701, max: 5900 },
    { level: 31, min: 5901, max: 6100 },
    { level: 32, min: 6101, max: 6300 },
    { level: 33, min: 6301, max: 6500 },
];

// Función para obtener información del nivel basado en puntos totales
export function getLevelInfo(totalPoints: number) {
    // Encontrar el nivel actual
    let currentLevelData = LEVEL_THRESHOLDS[0];
    const maxLevel = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1].level;

    for (const levelData of LEVEL_THRESHOLDS) {
        if (totalPoints >= levelData.min && totalPoints <= levelData.max) {
            currentLevelData = levelData;
            break;
        }
        // Si los puntos son > al máximo del último nivel, usar el último nivel
        if (levelData.level === maxLevel && totalPoints >= levelData.min) {
            currentLevelData = levelData;
            break;
        }
    }

    // Calcular progreso dentro del nivel actual
    const pointsInLevel = totalPoints - currentLevelData.min;
    const levelRange = currentLevelData.max - currentLevelData.min;
    const progressPercentage = Math.min((pointsInLevel / levelRange) * 100, 100);

    // Obtener el siguiente nivel
    const currentLevelIndex = LEVEL_THRESHOLDS.findIndex(l => l.level === currentLevelData.level);
    const nextLevelData = currentLevelIndex < LEVEL_THRESHOLDS.length - 1 ? LEVEL_THRESHOLDS[currentLevelIndex + 1] : null;

    // Calcular puntos necesarios para el siguiente nivel REAL (basado en el min del siguiente nivel)
    const pointsNeeded = nextLevelData ? nextLevelData.min - totalPoints : 0;

    return {
        currentLevel: currentLevelData.level,
        nextLevel: nextLevelData ? nextLevelData.level : currentLevelData.level,
        progressPercentage,
        pointsNeeded: Math.max(pointsNeeded, 0),
        currentLevelMin: currentLevelData.min,
        currentLevelMax: currentLevelData.max,
    };
}


