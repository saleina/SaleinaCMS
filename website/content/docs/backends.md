---
title: Backends
weight: 25
group: start
---

Saleina CMS stores content in your GitLab repository. In order for this to work, you need to authenticate with your Git host. We have a few options for handling this.

## GitLab Backend

For repositories stored on GitLab, the `gitlab` backend allows CMS users to log in directly with their GitLab account. Note that all users must have push access to your content repository for this to work.

The GitLab API allows for two types of OAuth2 flows: [Web Application Flow](https://docs.gitlab.com/ce/api/oauth2.html#web-application-flow), and [Implicit Grant](https://docs.gitlab.com/ce/api/oauth2.html#implicit-grant), which operates _without_ the need for an authentication server and which is the one Saleina CMS uses.

### Client-Side Implicit Grant

With GitLab's Implicit Grant, users can authenticate with GitLab directly from the client. To do this:

1. Follow the [GitLab docs](https://docs.gitlab.com/ee/integration/oauth_provider.html#adding-an-application-through-the-profile) to add your Saleina CMS instance as an OAuth application. For the **Redirect URI**, enter the address where you access Saleina CMS, for example, `https://www.example.com/admin/`. For scope, select `api`.
2. GitLab will give you an **Application ID**. Copy this and enter it in your Saleina CMS `config.yml` file, along with the following settings:

    ```yaml
    backend:
      name: gitlab
      repo: owner-name/repo-name # Path to your GitLab repository
      client_id: your-app-id # Application ID from your GitLab settings
    ```

GitLab will also provide you with a client secret. You should _never_ store this in your repo or reveal it in the client.