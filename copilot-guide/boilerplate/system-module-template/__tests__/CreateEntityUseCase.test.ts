/**
 * System Module Template - UseCase Unit Test
 *
 * Este é um template de teste unitário para use cases de módulos system.
 * Renomeie e adapte conforme necessário para seu módulo específico.
 *
 * Para usar:
 * 1. Substitua 'Entity' pelo nome da sua entidade
 * 2. Substitua 'CreateEntityUseCase' pelo nome do seu use case
 * 3. Implemente os testes específicos da sua lógica de negócio
 */

// Importe os helpers de teste - ajuste o path conforme a estrutura do seu projeto
import {
  createMockUser,
  createTestData,
  clearAllMocks,
} from '@/__tests__/helpers/testHelpers';

// Mock do repository
const mockEntityRepository = {
  initialize: jest.fn().mockResolvedValue(undefined),
  create: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// Mock do MultiLangCoreProvider
const mockMultiLangCoreProvider = {
  getTranscriptionByKeyAndLang: jest
    .fn()
    .mockResolvedValue('Mocked translation'),
};

// Mock do container TSyringe
jest.mock('tsyringe', () => ({
  container: {
    resolve: jest.fn((token: string) => {
      if (token === 'EntityRepository') return mockEntityRepository;
      if (token === 'MultiLangCoreProvider') return mockMultiLangCoreProvider;
      return {};
    }),
  },
}));

describe('CreateEntityUseCase (System Module)', () => {
  let useCase: any;
  let mockUser: any;

  beforeEach(() => {
    clearAllMocks();

    mockUser = createMockUser({
      tenant_id: 'tenant-123',
      project_id: 'project-456',
    });

    // Simular o UseCase (substitua pela classe real)
    useCase = {
      execute: jest.fn(),
      entityRepository: mockEntityRepository,
      multiLangProvider: mockMultiLangCoreProvider,
    };
  });

  afterEach(() => {
    clearAllMocks();
  });

  describe('execute', () => {
    it('should create entity successfully with valid data', async () => {
      // Arrange
      const createEntityData = {
        name: 'Test Entity',
        description: 'Test description',
      };

      const expectedEntity = createTestData.dto({
        id: 'entity-123',
        ...createEntityData,
      });

      mockEntityRepository.create.mockResolvedValue(expectedEntity);
      useCase.execute.mockResolvedValue(expectedEntity);

      // Act
      const result = await useCase.execute({
        ...createEntityData,
        user: mockUser,
      });

      // Assert
      expect(result).toEqual(expectedEntity);
      expect(mockEntityRepository.initialize).toHaveBeenCalledWith({
        tenant_id: mockUser.tenant_id,
        project_id: mockUser.project_id,
      });
    });

    it('should throw error when user is not provided', async () => {
      // Arrange
      const createEntityData = {
        name: 'Test Entity',
        description: 'Test description',
      };

      const expectedError = new Error('User is required');
      useCase.execute.mockRejectedValue(expectedError);

      // Act & Assert
      await expect(useCase.execute(createEntityData)).rejects.toThrow(
        'User is required',
      );
    });

    it('should throw error when tenant_id is missing', async () => {
      // Arrange
      const createEntityData = {
        name: 'Test Entity',
        description: 'Test description',
      };

      const userWithoutTenant = createMockUser({ tenant_id: undefined });
      const expectedError = new Error(
        'Tenant ID is required for system modules',
      );
      useCase.execute.mockRejectedValue(expectedError);

      // Act & Assert
      await expect(
        useCase.execute({
          ...createEntityData,
          user: userWithoutTenant,
        }),
      ).rejects.toThrow('Tenant ID is required for system modules');
    });

    it('should throw error when project_id is missing', async () => {
      // Arrange
      const createEntityData = {
        name: 'Test Entity',
        description: 'Test description',
      };

      const userWithoutProject = createMockUser({ project_id: undefined });
      const expectedError = new Error(
        'Project ID is required for system modules',
      );
      useCase.execute.mockRejectedValue(expectedError);

      // Act & Assert
      await expect(
        useCase.execute({
          ...createEntityData,
          user: userWithoutProject,
        }),
      ).rejects.toThrow('Project ID is required for system modules');
    });

    it('should handle repository initialization errors', async () => {
      // Arrange
      const createEntityData = {
        name: 'Test Entity',
        description: 'Test description',
      };

      const initError = new Error('Failed to initialize repository');
      mockEntityRepository.initialize.mockRejectedValue(initError);
      useCase.execute.mockRejectedValue(initError);

      // Act & Assert
      await expect(
        useCase.execute({
          ...createEntityData,
          user: mockUser,
        }),
      ).rejects.toThrow('Failed to initialize repository');
    });

    it('should validate required fields', async () => {
      // Arrange
      const invalidData = {
        name: '', // Invalid: empty name
        description: 'Valid description',
      };

      const validationError = new Error('Name is required');
      useCase.execute.mockRejectedValue(validationError);

      // Act & Assert
      await expect(
        useCase.execute({
          ...invalidData,
          user: mockUser,
        }),
      ).rejects.toThrow('Name is required');
    });

    it('should use correct language for error messages', async () => {
      // Arrange
      const createEntityData = {
        name: 'Test Entity',
        description: 'Test description',
      };

      const translationKey = 'error.validation.required';
      const expectedTranslation = 'Campo obrigatório';

      mockMultiLangCoreProvider.getTranscriptionByKeyAndLang.mockResolvedValue(
        expectedTranslation,
      );

      // Act
      const result =
        await mockMultiLangCoreProvider.getTranscriptionByKeyAndLang(
          translationKey,
          mockUser.lang,
        );

      // Assert
      expect(result).toBe(expectedTranslation);
      expect(
        mockMultiLangCoreProvider.getTranscriptionByKeyAndLang,
      ).toHaveBeenCalledWith(translationKey, mockUser.lang);
    });
  });

  describe('repository integration', () => {
    it('should initialize repository with correct parameters', async () => {
      // Arrange
      const initParams = {
        tenant_id: mockUser.tenant_id,
        project_id: mockUser.project_id,
      };

      // Act
      await mockEntityRepository.initialize(initParams);

      // Assert
      expect(mockEntityRepository.initialize).toHaveBeenCalledWith(initParams);
      expect(mockEntityRepository.initialize).toHaveBeenCalledTimes(1);
    });

    it('should handle database connection errors gracefully', async () => {
      // Arrange
      const dbError = new Error('Database connection failed');
      mockEntityRepository.create.mockRejectedValue(dbError);

      // Act & Assert
      await expect(mockEntityRepository.create({})).rejects.toThrow(
        'Database connection failed',
      );
    });
  });

  describe('business logic validation', () => {
    it('should enforce business rules specific to system modules', async () => {
      // Arrange
      const entityData = {
        name: 'Test Entity',
        description: 'Test description',
      };

      // Simular regra de negócio específica (ex: validação de permissões)
      const businessRuleValidation = jest
        .fn()
        .mockImplementation((data, user) => {
          if (!user.project_id) {
            throw new Error('User must be associated with a project');
          }
          return true;
        });

      // Act & Assert
      expect(() => businessRuleValidation(entityData, mockUser)).not.toThrow();

      const userWithoutProject = createMockUser({ project_id: undefined });
      expect(() =>
        businessRuleValidation(entityData, userWithoutProject),
      ).toThrow('User must be associated with a project');
    });
  });
});
