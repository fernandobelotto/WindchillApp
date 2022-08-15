import {
  Box,
  Button,
  Center,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function App() {
  const [result, setResult] = useState<string | null>(null);
  const [temperature, setTemperature] = useState(0);
  const [velocity, setVelocity] = useState(0);

  function meterPerSecondToMPH(value: number) {
    return value * 2.237;
  }

  function CelciusToFarenheit(value: number) {
    return value * (9 / 5) + 35;
  }
  function FarenheitToCelcius(value: number) {
    return (value - 32) * (5 / 9);
  }

  function windchillCalculate(t: number, v: number) {
    const velo = meterPerSecondToMPH(v);
    const temp = CelciusToFarenheit(t);

    const windchill =
      35.74 +
      0.6215 * temp -
      (35.75 * velo) ** 0.16 +
      (0.4275 * temp * velo) ** 0.16;
    return windchill;
  }

  function handleCalculate() {
    const windchill = windchillCalculate(temperature, velocity);

    setResult(FarenheitToCelcius(windchill).toPrecision(4));
  }

  return (
    <Center h="100vh">
      <VStack
        spacing={5}
        p={5}
        border="1px solid"
        borderColor="gray.300"
        rounded="lg"
      >
        <FormLabel>Tempetature (celcius) </FormLabel>
        <NumberInput onChange={(e: number) => setTemperature(e)} min={0}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormLabel>Wind speed (meter / second)</FormLabel>
        <NumberInput onChange={(e: number) => setVelocity(e)} min={0}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button onClick={handleCalculate}>Calculate</Button>

        <Box p={2} bg="gray.100" rounded="lg">
          Windchill {result}
        </Box>
      </VStack>
    </Center>
  );
}
