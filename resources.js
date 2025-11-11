// Load and display resources
document.addEventListener('DOMContentLoaded', function() {
    loadResources();
});

async function loadResources() {
    try {
        const response = await fetch('resources-data.json');
        const resourcesData = await response.json();
        displayResources(resourcesData);
    } catch (error) {
        console.error('Error loading resources:', error);
        displayError();
    }
}

function displayResources(resourcesData) {
    const container = document.getElementById('resources-container');

    resourcesData.forEach((category, index) => {
        // Create category section
        const categorySection = document.createElement('div');
        categorySection.className = 'resource-category';
        categorySection.style.animationDelay = `${index * 0.1}s`;

        // Category header
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'resource-category-header';
        categoryHeader.innerHTML = `
            <h2 class="category-title">${category.category}</h2>
            <p class="category-description">${category.description}</p>
        `;
        categorySection.appendChild(categoryHeader);

        // Files grid
        const filesGrid = document.createElement('div');
        filesGrid.className = 'resources-grid';

        category.files.forEach((file, fileIndex) => {
            const fileCard = document.createElement('div');
            fileCard.className = 'resource-card';
            fileCard.style.animationDelay = `${(index * 0.1) + (fileIndex * 0.05)}s`;

            const fileIcon = getFileIcon(file.type);
            const fileExtension = file.type === 'notebook' ? '.ipynb' : '.pdf';

            fileCard.innerHTML = `
                <div class="resource-icon">${fileIcon}</div>
                <div class="resource-info">
                    <h3 class="resource-title">${file.title}</h3>
                    <p class="resource-description">${file.description}</p>
                    <div class="resource-meta">
                        <span class="resource-type ${file.type}">${file.type.toUpperCase()}</span>
                        ${file.size !== 'TBD' ? `<span class="resource-size">${file.size}</span>` : ''}
                    </div>
                </div>
                <div class="resource-actions">
                    <a href="${file.path}" download="${file.filename}" class="btn-download">
                        <span class="download-icon">⬇</span>
                        Download
                    </a>
                    ${file.type === 'notebook' ? `
                        <button class="btn-preview" onclick="openInColab('${file.path}')">
                            <span class="colab-icon">🔬</span>
                            Open in Colab
                        </button>
                    ` : ''}
                </div>
            `;

            filesGrid.appendChild(fileCard);
        });

        categorySection.appendChild(filesGrid);
        container.appendChild(categorySection);
    });
}

function getFileIcon(type) {
    const icons = {
        'notebook': '📓',
        'pdf': '📄',
        'other': '📎'
    };
    return icons[type] || '📁';
}

function openInColab(filePath) {
    // Get the raw GitHub URL for the file
    const repoUrl = 'https://github.com/Haverford-Quantum-Computing-Club/HaverfordQuantum';
    const branch = 'main';
    const fileUrl = `${repoUrl}/blob/${branch}/${filePath}`;
    const colabUrl = `https://colab.research.google.com/github/Haverford-Quantum-Computing-Club/HaverfordQuantum/blob/${branch}/${filePath}`;

    window.open(colabUrl, '_blank');
}

function displayError() {
    const container = document.getElementById('resources-container');
    container.innerHTML = `
        <div class="error-message">
            <h3>⚠️ Unable to Load Resources</h3>
            <p>Please try refreshing the page or contact us if the problem persists.</p>
        </div>
    `;
}

// Add custom CSS for resources page
const style = document.createElement('style');
style.textContent = `
    .resources-section {
        padding: 4rem 2rem;
        min-height: 60vh;
    }

    .resources-intro {
        text-align: center;
        max-width: 800px;
        margin: 0 auto 4rem;
        padding: 1.5rem;
        background: rgba(139, 92, 246, 0.1);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 1rem;
        color: var(--text-secondary);
        line-height: 1.8;
    }

    #resources-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .resource-category {
        margin-bottom: 4rem;
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
    }

    .resource-category-header {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--border-color);
    }

    .category-title {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, var(--primary-purple), var(--primary-pink));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .category-description {
        color: var(--text-secondary);
        font-size: 1.1rem;
    }

    .resources-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .resource-card {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        padding: 1.5rem;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }

    .resource-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
        border-color: var(--primary-purple);
    }

    .resource-icon {
        font-size: 3rem;
        text-align: center;
        margin-bottom: 0.5rem;
    }

    .resource-info {
        flex-grow: 1;
    }

    .resource-title {
        font-size: 1.2rem;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }

    .resource-description {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    .resource-meta {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        flex-wrap: wrap;
    }

    .resource-type {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .resource-type.notebook {
        background: rgba(139, 92, 246, 0.2);
        color: var(--primary-purple);
    }

    .resource-type.pdf {
        background: rgba(236, 72, 153, 0.2);
        color: var(--primary-pink);
    }

    .resource-type.other {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-secondary);
    }

    .resource-size {
        color: var(--text-secondary);
        font-size: 0.85rem;
    }

    .resource-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .btn-download,
    .btn-preview {
        flex: 1;
        min-width: 120px;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        border: none;
        font-family: inherit;
    }

    .btn-download {
        background: linear-gradient(135deg, var(--primary-purple), var(--primary-blue));
        color: white;
    }

    .btn-download:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
    }

    .btn-preview {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid var(--border-color);
    }

    .btn-preview:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: var(--primary-purple);
    }

    .download-icon,
    .colab-icon {
        font-size: 1.2rem;
    }

    @media (max-width: 768px) {
        .resources-grid {
            grid-template-columns: 1fr;
        }

        .category-title {
            font-size: 1.5rem;
        }

        .resource-actions {
            flex-direction: column;
        }

        .btn-download,
        .btn-preview {
            width: 100%;
        }
    }
`;
document.head.appendChild(style);
