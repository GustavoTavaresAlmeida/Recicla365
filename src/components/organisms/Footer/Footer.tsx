import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../atoms/Text/Index';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import './Footer.css';

export interface FooterProps {
 
  showNavigation?: boolean;
  
  showSocialMedia?: boolean;
  
  showNewsletter?: boolean;
  
  variant?: 'default' | 'minimal' | 'extended';
}

export const Footer: React.FC<FooterProps> = ({
  showNavigation = true,
  showSocialMedia = true,
  showNewsletter = false,
  variant = 'default'
}) => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    {
      title: 'Plataforma',
      links: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Pontos de Coleta', href: '/collection-points' },
        { label: 'Mapa Interativo', href: '/map' },
        { label: 'Relatórios', href: '/reports' }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nós', href: '/about' },
        { label: 'Nossa Missão', href: '/mission' },
        { label: 'Sustentabilidade', href: '/sustainability' },
        { label: 'Blog', href: '/blog' }
      ]
    },
    {
      title: 'Suporte',
      links: [
        { label: 'Central de Ajuda', href: '/help' },
        { label: 'Documentação', href: '/docs' },
        { label: 'Contato', href: '/contact' },
        { label: 'FAQ', href: '/faq' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Termos de Uso', href: '/terms' },
        { label: 'Política de Privacidade', href: '/privacy' },
        { label: 'Cookies', href: '/cookies' },
        { label: 'LGPD', href: '/lgpd' }
      ]
    }
  ];

  const socialMediaLinks = [
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'YouTube', href: '#', icon: '📺' }
  ];

  if (variant === 'minimal') {
    return (
      <footer className="footer footer--minimal">
        <div className="container">
          <div className="footer__minimal-content">
            <div className="footer__brand-minimal">
              <Icon name="recycle" size="md" color="primary" />
              <Text variant="h6" weight="bold">Recicla365</Text>
            </div>
            <Text variant="body2" color="tertiary">
              © {currentYear} Recicla365 - Sistema Sustentável de Reciclagem
            </Text>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`footer footer--${variant}`}>
      <div className="container">
        {showNewsletter && (
          <div className="footer__newsletter">
            <div className="footer__newsletter-content">
              <div className="footer__newsletter-text">
                <Text variant="h5" weight="semibold" color="inherit">
                  🌱 Fique por dentro das novidades
                </Text>
                <Text variant="body2" color="inherit">
                  Receba dicas de sustentabilidade e atualizações da plataforma
                </Text>
              </div>
              <div className="footer__newsletter-form">
                <div className="footer__newsletter-input">
                  <input 
                    type="email" 
                    placeholder="seu@email.com"
                    className="footer__email-input"
                  />
                  <Button variant="secondary" size="md">
                    Inscrever-se
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="footer__main">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <Icon name="recycle" size="lg" color="primary" />
              <Text variant="h4" weight="bold" color="primary">
                Recicla365
              </Text>
            </Link>
            
            <Text variant="body1" color="secondary" className="footer__description">
              Transformando o futuro através da reciclagem consciente. 
              Conectamos pessoas, empresas e pontos de coleta para um planeta mais sustentável.
            </Text>
            
            <div className="footer__contact-info">
              <div className="footer__contact-item">
                <Icon name="location" size="sm" color="secondary" />
                <Text variant="body2" color="secondary">
                  Joinville, Santa Catarina, Brasil
                </Text>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📧</span>
                <Text variant="body2" color="secondary">
                  contato@recicla365.com.br
                </Text>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📱</span>
                <Text variant="body2" color="secondary">
                  (47) 3333-4444
                </Text>
              </div>
            </div>

            {showSocialMedia && (
              <div className="footer__social">
                <Text variant="body2" color="secondary" className="footer__social-title">
                  Siga-nos:
                </Text>
                <div className="footer__social-links">
                  {socialMediaLinks.map((social) => (
                    <a 
                      key={social.name}
                      href={social.href}
                      className="footer__social-link"
                      aria-label={social.name}
                      title={social.name}
                    >
                      <span className="footer__social-icon">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showNavigation && variant === 'extended' && (
            <div className="footer__navigation">
              {navigationLinks.map((section) => (
                <div key={section.title} className="footer__nav-section">
                  <Text variant="h6" weight="semibold" className="footer__nav-title">
                    {section.title}
                  </Text>
                  <ul className="footer__nav-list">
                    {section.links.map((link) => (
                      <li key={link.href} className="footer__nav-item">
                        <Link to={link.href} className="footer__nav-link">
                          <Text variant="body2" color="secondary">
                            {link.label}
                          </Text>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {variant === 'extended' && (
          <div className="footer__stats">
            <div className="footer__stats-grid">
              <div className="footer__stat">
                <Text variant="h4" weight="bold" color="primary">
                  1,200+
                </Text>
                <Text variant="caption" color="tertiary">
                  Pontos de Coleta
                </Text>
              </div>
              <div className="footer__stat">
                <Text variant="h4" weight="bold" color="secondary">
                  50 ton
                </Text>
                <Text variant="caption" color="tertiary">
                  Materiais Reciclados
                </Text>
              </div>
              <div className="footer__stat">
                <Text variant="h4" weight="bold" color="primary">
                  5,000+
                </Text>
                <Text variant="caption" color="tertiary">
                  Usuários Ativos
                </Text>
              </div>
              <div className="footer__stat">
                <Text variant="h4" weight="bold" color="secondary">
                  25
                </Text>
                <Text variant="caption" color="tertiary">
                  Cidades Atendidas
                </Text>
              </div>
            </div>
          </div>
        )}

        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <Text variant="body2" color="tertiary">
              © {currentYear} Recicla365. Todos os direitos reservados.
            </Text>
            
            <div className="footer__bottom-links">
              <Link to="/terms" className="footer__bottom-link">
                <Text variant="body2" color="tertiary">
                  Termos
                </Text>
              </Link>
              <Link to="/privacy" className="footer__bottom-link">
                <Text variant="body2" color="tertiary">
                  Privacidade
                </Text>
              </Link>
              <Link to="/cookies" className="footer__bottom-link">
                <Text variant="body2" color="tertiary">
                  Cookies
                </Text>
              </Link>
            </div>

            <div className="footer__certifications">
              <span className="footer__cert">🌿 Carbon Neutral</span>
              <span className="footer__cert">♻️ 100% Reciclável</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};