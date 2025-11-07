import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Collapse from '../composants/Collapse.jsx';

describe('Collapse', () => {
  test('affiche le titre, fermé par défaut (aria-expanded=false)', () => {
    const { container } = render(
      <Collapse title="Description" content="Texte long" />
    );

    // le titre est visible
    expect(screen.getByText('Description')).toBeInTheDocument();

    // bouton fermé par défaut
    const button = container.querySelector('.collapse-header');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // conteneur contenu sans la classe "open" par défaut
    const content = container.querySelector('.collapse-content');
    expect(content).not.toHaveClass('open');
  });

  test('s’ouvre au clic (aria-expanded=true + classe "open") et montre le contenu texte', () => {
    const { container } = render(
      <Collapse title="Équipements" content="Wifi, TV, Cuisine" />
    );

    const button = container.querySelector('.collapse-header');

    // clic 1 => ouverture
    fireEvent.click(button);

    // aria-expanded à true
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // classe "open" présente
    const content = container.querySelector('.collapse-content');
    expect(content).toHaveClass('open');

    // texte visible dans le DOM
    expect(screen.getByText('Wifi, TV, Cuisine')).toBeInTheDocument();
  });

  test('se referme après un deuxième clic (aria-expanded=false + classe "open" retirée)', () => {
    const { container } = render(
      <Collapse title="Description" content="Texte de description" />
    );

    const button = container.querySelector('.collapse-header');
    const content = container.querySelector('.collapse-content');

    // 1er clic : on ouvre
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(content).toHaveClass('open');
    expect(screen.getByText('Texte de description')).toBeInTheDocument();

    // 2e clic : on referme
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(content).not.toHaveClass('open');
    // le contenu est toujours dans le DOM, mais visuellement caché par le CSS
  });

  test('accepte un contenu React (ex: liste) et l’affiche une fois ouvert', () => {
    const list = (
      <ul>
        <li>Wifi</li>
        <li>Clim</li>
      </ul>
    );

    const { container } = render(
      <Collapse title="Équipements" content={list} />
    );

    // ouvre
    const button = container.querySelector('.collapse-header');
    fireEvent.click(button);

    expect(screen.getByText('Wifi')).toBeInTheDocument();
    expect(screen.getByText('Clim')).toBeInTheDocument();
  });

  test('affiche correctement un autre contenu texte passé en props', () => {
    const { container } = render(
      <Collapse title="Règles" content="Pas de fêtes, pas d’animaux." />
    );

    const button = container.querySelector('.collapse-header');

    // on ouvre
    fireEvent.click(button);

    // on vérifie que c’est bien CE texte-là qui est affiché
    expect(
      screen.getByText('Pas de fêtes, pas d’animaux.')
    ).toBeInTheDocument();
  });
});
