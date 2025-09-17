import { useEffect, useState } from 'react';
import {
  AppShell,
  Button,
  Group,
  Text,
  Title,
  TextInput,
  Stack,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconMoon, IconSun, IconPlayerPlay } from '@tabler/icons-react';

interface ApiInfo {
  name: string;
  version: string;
  description: string;
  environment: string;
}

interface HealthCheck {
  status: string;
  message: string;
  timestamp: string;
}

function ColorSchemeToggle(): React.ReactElement {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const next = colorScheme === 'light' ? 'dark' : 'light';
  return (
    <ActionIcon
      variant="default"
      onClick={() => toggleColorScheme()}
      aria-label="Toggle color scheme"
      title={`Switch to ${next}`}
    >
      {colorScheme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
    </ActionIcon>
  );
}

export default function App(): React.ReactElement {
  const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null);
  const [health, setHealth] = useState<HealthCheck | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');

  const fetchApiInfo = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/info');
      const data = (await response.json()) as ApiInfo;
      setApiInfo(data);
    } catch (error) {
      console.error('Failed to fetch API info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHealth = async (): Promise<void> => {
    try {
      const response = await fetch('/api/health');
      const data = (await response.json()) as HealthCheck;
      setHealth(data);
    } catch (error) {
      console.error('Failed to fetch health check:', error);
    }
  };

  useEffect(() => {
    fetchApiInfo();
    fetchHealth();
  }, []);

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!title.trim()) {
      notifications.show({ color: 'red', title: 'Validation', message: 'Title is required' });
      return;
    }
    notifications.show({ color: 'green', title: 'Form Submitted', message: `Title: ${title}` });
    setTitle('');
  };

  const openDemoModal = (): void => {
    modals.openConfirmModal({
      title: 'Demo Modal',
      children: <Text>Are you sure you want to continue?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => notifications.show({ message: 'Confirmed!' }),
    });
  };

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" px="md" h="100%">
          <Group>
            <Title order={3}>Spec-Kit Project Test</Title>
            <Text c="dimmed">Vite + React + Node.js</Text>
          </Group>
          <Group gap="xs">
            <Button variant="light" onClick={() => notifications.show({ message: 'Hello from Notifications!' })}>
              Show Notification
            </Button>
            <Button variant="outline" onClick={openDemoModal}>Open Modal</Button>
            <ColorSchemeToggle />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Stack>
          <form onSubmit={onSubmit} aria-label="demo-form">
            <Group align="flex-end">
              <TextInput
                label="Title"
                placeholder="Enter a title"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                required
              />
              <Button type="submit" leftSection={<IconPlayerPlay size={16} />}>Submit</Button>
            </Group>
          </form>

          <Group>
            <Button loading={isLoading} onClick={fetchApiInfo} data-testid="refresh-api-info">
              Refresh API Info
            </Button>
            <Button variant="default" onClick={fetchHealth} data-testid="check-health">
              Check Server Health
            </Button>
          </Group>

          {apiInfo && (
            <Stack gap={4}>
              <Title order={4}>API Information</Title>
              <Text><strong>Name:</strong> {apiInfo.name}</Text>
              <Text><strong>Version:</strong> {apiInfo.version}</Text>
              <Text><strong>Description:</strong> {apiInfo.description}</Text>
              <Text><strong>Environment:</strong> {apiInfo.environment}</Text>
            </Stack>
          )}

          {health && (
            <Stack gap={4}>
              <Title order={4}>Server Health</Title>
              <Text><strong>Status:</strong> {health.status}</Text>
              <Text><strong>Message:</strong> {health.message}</Text>
              <Text><strong>Timestamp:</strong> {new Date(health.timestamp).toLocaleString()}</Text>
            </Stack>
          )}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
