//Пока использую только для нового ввода. Надо распространить для всех компонентов с формой
import { useCallback, useState } from "react";

function useForm() {
  const [values, setValues] = useState({});

  const handleInput = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  }

  const reset = useCallback(
    (newValue = {}) => {
      setValues(newValue);
    }, [setValues]
  )

  return { values, handleInput, reset };
}

export default useForm;