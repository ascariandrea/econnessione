import { faGithub, faSlack } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { themedUseStyletron } from "@theme/CustomTheme";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { StyledLink } from "baseui/link";
import { Menu } from "baseui/menu";
import { HeadingXSmall } from "baseui/typography";
import * as React from "react";
import { mainMenu } from "./Header";
import { PaypalDonateButton } from "./buttons/PaypalDonateButton";

export const Footer: React.FC = () => {
  const [, theme] = themedUseStyletron();
  const {
    site: {
      siteMetadata: { title, github, mattermost },
    },
  } = {
    site: {
      siteMetadata: {
        title: "",
        github: { link: "https://github.com/ascariandrea/econnessione" },
        mattermost: { link: "https://mattermost.econnessione.org" },
      },
    },
  };
  return (
    <FlexGridItem padding="40px" backgroundColor={theme.colors.brandPrimary}>
      <footer>
        <FlexGrid flexGridColumnCount={4}>
          <FlexGridItem>
            <HeadingXSmall>{title}</HeadingXSmall>
          </FlexGridItem>
          <FlexGridItem>
            <Menu
              overrides={{
                List: {
                  style: { backgroundColor: "trasparent", boxShadow: "none" },
                },
                ListItem: {
                  style: { color: theme.colors.primary },
                },
              }}
              items={mainMenu}
            />
          </FlexGridItem>
          <FlexGridItem>
            <PaypalDonateButton />
          </FlexGridItem>
          <FlexGridItem>
            <ul style={{ listStyle: "none" }}>
              <li>
                <StyledLink href={github.link}>
                  <FontAwesomeIcon icon={faGithub} /> Github
                </StyledLink>
              </li>
              <li>
                <StyledLink href={mattermost.link}>
                  <FontAwesomeIcon icon={faSlack} /> Slack
                </StyledLink>
              </li>
            </ul>
          </FlexGridItem>
        </FlexGrid>
      </footer>
    </FlexGridItem>
  );
};