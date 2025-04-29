//Функція, яка обробляє три різні режими розрахунків короткого замикання та стійкості обладнання у електричних мережах

export function calculateResults(formData) {
    const mode = formData.mode;

    if (mode === "threePhase") {
        const { nominalVoltage, totalImpedance } = formData;
        if (!nominalVoltage || !totalImpedance) {
            throw new Error("Будь ласка, заповніть всі поля!");
        }
        const I_kz3 = nominalVoltage / (Math.sqrt(3) * totalImpedance);
        return {
            mode,
            I_kz3: I_kz3.toFixed(2)
        };
    }

    if (mode === "singlePhase") {
        const { phaseVoltage, z1, z2, z0 } = formData;
        if (!phaseVoltage || !z1 || !z2 || !z0) {
            throw new Error("Будь ласка, заповніть всі поля!");
        }
        const I_kz1 = (3 * phaseVoltage) / (z1 + z2 + z0);
        return {
            mode,
            I_kz1: I_kz1.toFixed(2)
        };
    }

    if (mode === "stability") {
        const {
            shortCircuitCurrent: Ik,
            pulseCoefficient: Kp,
            thermalTime: ttr,
            dynamicStability: Idyn,
            thermalStability: Ith,
            thermalTimeEquipment: tob
        } = formData;

        if (!Ik || !Kp || !ttr || !Idyn || !Ith || !tob) {
            throw new Error("Будь ласка, заповніть всі поля!");
        }

        const i_ud = Ik * Math.sqrt(2) * Kp;
        const B_k = Math.pow(Ik, 2) * ttr;
        const B_limit = Math.pow(Ith, 2) * tob;

        const dynamicCheck = i_ud <= Idyn;
        const thermalCheck = B_k <= B_limit;

        return {
            mode,
            i_ud: i_ud.toFixed(2),
            B_k: B_k.toFixed(2),
            dynamicCheck,
            thermalCheck
        };
    }

    throw new Error("Невідомий режим розрахунку.");
}