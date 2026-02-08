/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useTanStackQueryDevTools } from '@rozenite/tanstack-query-plugin';
import { StyleSheet, Text, View } from 'react-native';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 3,
    },
  },
});

function Demo() {
  useTanStackQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Text>Hello, World!</Text>
        <QueryComponent />
      </View>
    </QueryClientProvider>
  );
}

function QueryComponent() {
  useQuery({
    queryKey: ['some-key'],
    queryFn: () => Promise.resolve({ data: 123 }),
  });

  return null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Demo;
