import { useEffect, useMemo, useState } from 'react';
import { CounterViewModel } from '../viewmodels/CounterViewModel';

export function useCounterViewModel(initial = 0) {
  const vm = useMemo(() => new CounterViewModel(initial), [initial]);
  const [count, setCount] = useState(vm.getCount());

  useEffect(() => {
    const unsubscribe = vm.subscribe(setCount);
    return unsubscribe;
  }, [vm]);

  return {
    count,
    increment: () => vm.increment(),
    decrement: () => vm.decrement(),
    reset: (value = 0) => vm.reset(value),
  };
}