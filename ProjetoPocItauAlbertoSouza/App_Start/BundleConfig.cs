using System.Web;
using System.Web.Optimization;

namespace ProjetoPocItauAlbertoSouza
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery.validate.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/js").Include(

                      /*ui - costomizacao*/
                      "~/Scripts/jquery-ui.min.js",

                      /*slick - costomizacao*/
                      "~/Scripts/slick.min.js",
                      "~/Scripts/jquery-migrate-1.2.1.min.js",
                      
                      /*jqgrid - costomizacao*/
                      "~/Scripts/trirand/src/jquery.jqGrid.js",
                      "~/Scripts/trirand/i18n/grid.locale-pt-br.js",
                      "~/Scripts/prettify/prettify.js"
                      ));
                        
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularjs").Include(
                      "~/Scripts/angular-1.6.4/angular.min.js",
                      "~/Scripts/angular-1.6.4/angular-route.min.js",
                      "~/Scripts/angular-1.6.4/angular-confirm.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularjs_app").Include(
                      "~/Content/App/*.js",
                      "~/Content/App/Service/*.js",
                      "~/Content/App/Controller/*.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/angular-confirm.css",
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-theme.css",

                      /*jqgrid - costomizacao*/
                      "~/Content/slick-theme.css",
                      "~/Content/slick.css",

                      /*jqgrid - costomizacao*/
                      "~/Content/trirand/ui.jqgrid-bootstrap.css",
                      "~/Content/prettify.css",

                      /*site - costomizacao*/
                      "~/Content/site.css"));
        }
    }
}
