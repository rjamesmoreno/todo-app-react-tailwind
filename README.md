# Task Manager App

This is a simple to-do list manager built using React, Vite, and Tailwind CSS. The project aims to showcase skills in web development, particularly in creating a functional and aesthetic task manager application.

https://todo-app-rendell.pages.dev
## Features

- Add new tasks
- Edit existing tasks
- Mark tasks as complete
- Delete tasks
- Task persistence using local storage
- Responsive design using Tailwind CSS

## Technologies Used

- React
- Vite
- Tailwind CSS
- Tabler Icons
- TypeScript
- Local Storage

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Bun (Optional)

### Installation

#### Using npm

1. Clone the repository:

    ```bash
    git clone https://github.com/rjamesmoreno/todo-app-react-vite-tailwind.git
    cd task-manager
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

#### Using Bun

1. Clone the repository:

    ```bash
    git clone https://github.com/rjamesmoreno/todo-app-react-vite-tailwind.git
    cd task-manager
    ```

2. Install the dependencies:

    ```bash
    bun install
    ```

3. Start the development server:

    ```bash
    bun dev
    ```

### Build for Production

To create a production build of the project:

#### Using npm

```bash
npm run build
```

### Using bun

```bash
bun build
```

### Running production build

After building the project, you can preview the production build using:

#### Using npm

```bash
npm run serve
```

This serves the production build locally.

#### Using bun

```bash
bun serve
```

## Customization
Feel free to customize the project to suit your needs. The `Dashboard` component manages the list of tasks and handles the addition, deletion, and editing of tasks. The `Task` component is responsible for rendering individual tasks and handling task-specific actions like marking as complete, editing, and deleting.

