if [[ $VERCEL_GIT_COMMIT_REF == "master"  ]] ; then 
  npm run build:production
elif [[ $VERCEL_GIT_COMMIT_REF == "staging"  ]] ; then 
  echo "This is the staging environment"
  npm run build:staging
else
  npm run build
fi