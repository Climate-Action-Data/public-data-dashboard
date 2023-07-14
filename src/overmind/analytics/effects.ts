import { EffectResponse } from "@/@types/EffectResponse";
import { CarbonReduction } from "./state";

export const getCarbonReduction = async (): Promise<EffectResponse<CarbonReduction>> => {
    try {
        await new Promise(f => setTimeout(f, 5000));
        return {
            data: {
                activeProjects: 455,
                totalReduction: 7.96,
                annualEstReduction: 38.1,
                sectors: [
                    { label: "Renewable Energy", value: 40 },
                    { label: "Waste Disposal", value: 24 },
                    { label: "Energy Efficiency", value: 19 },
                    { label: "Others", value: 17 }
                ],
                standards: {
                    vcs: 74,
                    gcc: 15,
                    eco: 10
                }
            },
        }
    } catch (error) {
        return { error: { code: "200", message: "could not fetch data" } }
    }
};
