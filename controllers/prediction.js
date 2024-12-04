const prediction = async (req, res) => {
    try {
        const { date, state } = req.body; // Expecting input in the request body

        if (!date || !state) {
            return res.status(400).json({
                success: false,
                message: "Date and state are required fields.",
            });
        }

        // Parse the date to check day and month
        const [day, month, year] = date.split("-").map(Number);
        const inputDate = new Date(`${year}-${month}-${day}`);

        // Get the day of the week (0 for Sunday, 6 for Saturday)
        const dayOfWeek = inputDate.getDay();

        // Determine if it is summer (e.g., months April to June)
        const isSummer = month >= 4 && month <= 6;

        // Data for states (min, max, mean values)
        const stateData = {
            "Himachal Pradesh": { min: 439, max: 1128, mean: 847 },
            "Uttarakhand": { min: 674, max: 1594, mean: 1167 },
            "Madhya Pradesh": { min: 3481, max: 9790, mean: 6231 },
            "Sikkim": { min: 26, max: 63, mean: 42 },
        };

        // Check if the state is valid
        if (!stateData[state]) {
            return res.status(400).json({
                success: false,
                message: "Invalid state provided. Supported states: Himachal Pradesh, Uttarakhand, Madhya Pradesh, Sikkim.",
            });
        }

        const { min, max, mean } = stateData[state];

        // Generate a random value around the mean, adjusted for weekends and summer
        let predictedValue;
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            // Weekend: Higher range
            predictedValue = Math.random() * (max - mean) + mean;
        } else if (isSummer) {
            // Summer: 3rd quartile
            predictedValue = Math.random() * (max - (max + mean) / 2) + (max + mean) / 2;
        } else {
            // Normal days: Around the mean
            predictedValue = Math.random() * (mean - min) + min;
        }

        res.status(200).json({
            success: true,
            data: {
                date,
                state,
                predictedValue: Math.round(predictedValue), // Rounded for better readability
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { prediction };