import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from '../composants/Banner.jsx';

describe('Banner (overlay en fonction du titre)', () => {
  test('SANS titre : image rendue, PAS d’overlay, PAS de <h1>', () => {
    const { container } = render(<Banner />);

    // Image avec alt par défaut
    expect(screen.getByRole('img', { name: /paysage de forêt et de montagnes/i })
    ).toBeInTheDocument();

    // PAS d’overlay si pas de titre
    expect(container.querySelector('.banner-overlay')).toBeFalsy();

    // PAS de titre
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull();
  });

  test('AVEC titre : image rendue, overlay PRÉSENT, <h1> rendu', () => {
    const { container } = render(
      <Banner
        imageUrl="https://exemple.com/ban.jpg"
        title="Mon titre"
        alt="Bannière custom"
      />
    );

    // Titre (h1) rendu
    const h1 = screen.getByRole('heading', { level: 1, name: /mon titre/i });
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveClass('banner-title');

    // Image + alt custom
    const img = screen.getByRole('img', { name: /bannière custom/i });
    expect(img).toHaveAttribute('src', 'https://exemple.com/ban.jpg');

    // Overlay PRÉSENT si le titre est fourni
    expect(container.querySelector('.banner-overlay')).toBeTruthy();
  });
});


