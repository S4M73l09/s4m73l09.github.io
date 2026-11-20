import type { PortfolioLanguage } from './types';

type CategoryId =
  | 'cloud'
  | 'iac'
  | 'containers'
  | 'orchestration'
  | 'monitoring'
  | 'devsecops'
  | 'cicd'
  | 'configuration'
  | 'scripting'
  | 'languages'
  | 'operatingSystems'
  | 'identity'
  | 'networking'
  | 'integrations'
  | 'other';

const categoryByTechnology: Record<string, CategoryId> = {
  azure: 'cloud',
  gcloud: 'cloud',
  gcs: 'cloud',
  'google cloud': 'cloud',
  'google cloud storage': 'cloud',
  terraform: 'iac',
  docker: 'containers',
  kubernetes: 'orchestration',
  aks: 'orchestration',
  grafana: 'monitoring',
  prometheus: 'monitoring',
  monitoring: 'monitoring',
  trivy: 'devsecops',
  checkov: 'devsecops',
  'opa/conftest': 'devsecops',
  opa: 'devsecops',
  conftest: 'devsecops',
  gitleaks: 'devsecops',
  tflint: 'devsecops',
  devsecops: 'devsecops',
  'github actions': 'cicd',
  'ci/cd': 'cicd',
  'ci/cd (github actions)': 'cicd',
  ansible: 'configuration',
  powershell: 'scripting',
  bash: 'scripting',
  golang: 'languages',
  go: 'languages',
  python: 'languages',
  linux: 'operatingSystems',
  'windows server core': 'operatingSystems',
  'active directory': 'identity',
  oidc: 'identity',
  dns: 'networking',
  wireguard: 'networking',
  'context model protocol (mcp)': 'integrations',
  mcp: 'integrations'
};

const categoryLabels: Record<PortfolioLanguage, Record<CategoryId, string>> = {
  es: {
    cloud: 'Nube',
    iac: 'IaC',
    containers: 'Contenedores',
    orchestration: 'Orquestación',
    monitoring: 'Monitorización',
    devsecops: 'DevSecOps',
    cicd: 'CI/CD',
    configuration: 'Configuración',
    scripting: 'Scripting',
    languages: 'Lenguajes',
    operatingSystems: 'Sistemas operativos',
    identity: 'Identidad',
    networking: 'Redes',
    integrations: 'Integraciones',
    other: 'Otros'
  },
  en: {
    cloud: 'Cloud',
    iac: 'IaC',
    containers: 'Containers',
    orchestration: 'Orchestration',
    monitoring: 'Monitoring',
    devsecops: 'DevSecOps',
    cicd: 'CI/CD',
    configuration: 'Configuration',
    scripting: 'Scripting',
    languages: 'Languages',
    operatingSystems: 'Operating systems',
    identity: 'Identity',
    networking: 'Networking',
    integrations: 'Integrations',
    other: 'Other'
  }
};

const categoryOrder = Object.keys(categoryLabels.es) as CategoryId[];

export const groupTechnologies = (technologies: string[], language: PortfolioLanguage) => {
  const groups = new Map<CategoryId, string[]>();

  for (const technology of technologies) {
    const normalized = technology.trim().toLowerCase();
    if (!normalized) continue;

    const category = categoryByTechnology[normalized] ?? 'other';
    const items = groups.get(category) ?? [];
    if (!items.some((item) => item.toLowerCase() === normalized)) items.push(technology.trim());
    groups.set(category, items);
  }

  return categoryOrder
    .filter((category) => groups.has(category))
    .map((category) => ({ category: categoryLabels[language][category], technologies: groups.get(category)! }));
};
