import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import authService from '../api/users'; // Adjust the path as needed
import API from '../api/axios';

const Nav = styled.nav`
  background-color: var(--color-paper);
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const NavBrand = styled(Link)`
  color: var(--color-text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: var(--color-primary);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
`;

const MainNavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  margin-right: ${props => props.theme.spacing.xl};
`;

const NavLink = styled(Link)`
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all ${props => props.theme.transitions.fast};
  position: relative;

  &:hover {
    color: var(--color-text-primary);
    background-color: var(--color-background);
  }

  &.active {
    color: var(--color-primary);
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--color-primary);
    }
  }
`;

const Button = styled.button`
  background-color: ${props => props.primary ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.primary ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'};
  border: 1px solid ${props => props.primary ? 'var(--color-primary)' : 'var(--color-border-main)'};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.primary ? 'var(--color-primary-dark)' : 'var(--color-background)'};
    color: var(--color-text-primary);
  }
`;

const UserSection = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  padding-left: ${props => props.theme.spacing.md};
  border-left: 1px solid var(--color-border-main);
`;

const Nav = styled.nav`
  background-color: var(--color-paper);
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const NavBrand = styled(Link)`
  color: var(--color-text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: var(--color-primary);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
`;

const MainNavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  margin-right: ${props => props.theme.spacing.xl};
`;

const NavLink = styled(Link)`
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all ${props => props.theme.transitions.fast};
  position: relative;

  &:hover {
    color: var(--color-text-primary);
    background-color: var(--color-background);
  }

  &.active {
    color: var(--color-primary);
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--color-primary);
    }
  }
`;

const Button = styled.button`
  background-color: ${props => props.primary ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.primary ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'};
  border: 1px solid ${props => props.primary ? 'var(--color-primary)' : 'var(--color-border-main)'};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.primary ? 'var(--color-primary-dark)' : 'var(--color-background)'};
    color: var(--color-text-primary);
  }
`;

const UserSection = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  padding-left: ${props => props.theme.spacing.md};
  border-left: 1px solid var(--color-border-main);
`;

function Navbar() {
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [categorylist, setcategorylist] = useState([]);


    useEffect(() => {
        const fetchUser = async () => {
            if (authService.isLoggedIn()) {
                try {
                    const user = await authService.getCurrentUser();
                    setUserEmail(user.email);
                } catch (error) {
                    console.error("Failed to fetch user:", error.message);
                    setUserEmail(null);
                    navigate('/login');
                }
            }

        };

        const fetchCategory = async()=> {
            const category = await API.get("/api/categories/") 
            console.log(category);
            
            setcategorylist(category.data)

          

        }


        

        fetchUser();
        fetchCategory();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await authService.logout();
            setUserEmail(null);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <Nav>
            <NavContainer>
                <NavBrand to="/">صدقة</NavBrand>
                <NavLinks>
                    <MainNavLinks>
                         {/* <NavLink to="/campaigns" className={isActive('/campaigns') ? 'active' : ''}>
                            الحملات
                        </NavLink>
                        <NavLink to="/sponsorships" className={isActive('/sponsorships') ? 'active' : ''}>
                            الكفالات
                        </NavLink>
                        <NavLink to="/education" className={isActive('/education') ? 'active' : ''}>
                            التعليم
                        </NavLink>
                        <NavLink to="/occasions" className={isActive('/occasions') ? 'active' : ''}>
                            المناسبات
                        </NavLink> */}
                        {categorylist?.map(category=><NavLink to={`/category/${category?.id}`} className={isActive('/education') ? 'active' : ''}>
                            { category?.name }
                        </NavLink>) }
                    </MainNavLinks>
                    <UserSection>
                        {userEmail ? (
                            <>
                                <NavLink to="/profile" className={isActive('/profile') ? 'active' : ''}>
                                    {userEmail}
                                </NavLink>
                                <Button onClick={handleLogout}>تسجيل الخروج</Button>
                            </>
                        ) : (
                            <Button primary as={Link} to="/login">
                                تسجيل الدخول
                            </Button>
                        )}
                    </UserSection>
                </NavLinks>
            </NavContainer>
        </Nav>
    );
}

export default Navbar;
