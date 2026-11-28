export const FOOD_ANALYSIS_PROMPT = `
Analyse the food visible in this photograph.

For each visible food:
- Identify the food.
- Estimate its portion size.
- Estimate calories and protein.
- Account for likely cooking oil.
- Assign high, medium or low confidence.

Avoid double counting ingredients.
Do not invent foods that are not visible.
Use reasonable nutritional estimates for Indian meals.

If no food is visible, return an empty items array.

Return concise JSON matching the provided schema.
Do not provide lengthy explanations.
`;