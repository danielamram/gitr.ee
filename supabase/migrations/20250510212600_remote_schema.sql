revoke delete on table "public"."github_activity" from "anon";

revoke insert on table "public"."github_activity" from "anon";

revoke references on table "public"."github_activity" from "anon";

revoke select on table "public"."github_activity" from "anon";

revoke trigger on table "public"."github_activity" from "anon";

revoke truncate on table "public"."github_activity" from "anon";

revoke update on table "public"."github_activity" from "anon";

revoke delete on table "public"."github_activity" from "authenticated";

revoke insert on table "public"."github_activity" from "authenticated";

revoke references on table "public"."github_activity" from "authenticated";

revoke select on table "public"."github_activity" from "authenticated";

revoke trigger on table "public"."github_activity" from "authenticated";

revoke truncate on table "public"."github_activity" from "authenticated";

revoke update on table "public"."github_activity" from "authenticated";

revoke delete on table "public"."github_activity" from "service_role";

revoke insert on table "public"."github_activity" from "service_role";

revoke references on table "public"."github_activity" from "service_role";

revoke select on table "public"."github_activity" from "service_role";

revoke trigger on table "public"."github_activity" from "service_role";

revoke truncate on table "public"."github_activity" from "service_role";

revoke update on table "public"."github_activity" from "service_role";

revoke delete on table "public"."github_followers" from "anon";

revoke insert on table "public"."github_followers" from "anon";

revoke references on table "public"."github_followers" from "anon";

revoke select on table "public"."github_followers" from "anon";

revoke trigger on table "public"."github_followers" from "anon";

revoke truncate on table "public"."github_followers" from "anon";

revoke update on table "public"."github_followers" from "anon";

revoke delete on table "public"."github_followers" from "authenticated";

revoke insert on table "public"."github_followers" from "authenticated";

revoke references on table "public"."github_followers" from "authenticated";

revoke select on table "public"."github_followers" from "authenticated";

revoke trigger on table "public"."github_followers" from "authenticated";

revoke truncate on table "public"."github_followers" from "authenticated";

revoke update on table "public"."github_followers" from "authenticated";

revoke delete on table "public"."github_followers" from "service_role";

revoke insert on table "public"."github_followers" from "service_role";

revoke references on table "public"."github_followers" from "service_role";

revoke select on table "public"."github_followers" from "service_role";

revoke trigger on table "public"."github_followers" from "service_role";

revoke truncate on table "public"."github_followers" from "service_role";

revoke update on table "public"."github_followers" from "service_role";

revoke delete on table "public"."github_follows" from "anon";

revoke insert on table "public"."github_follows" from "anon";

revoke references on table "public"."github_follows" from "anon";

revoke select on table "public"."github_follows" from "anon";

revoke trigger on table "public"."github_follows" from "anon";

revoke truncate on table "public"."github_follows" from "anon";

revoke update on table "public"."github_follows" from "anon";

revoke delete on table "public"."github_follows" from "authenticated";

revoke insert on table "public"."github_follows" from "authenticated";

revoke references on table "public"."github_follows" from "authenticated";

revoke select on table "public"."github_follows" from "authenticated";

revoke trigger on table "public"."github_follows" from "authenticated";

revoke truncate on table "public"."github_follows" from "authenticated";

revoke update on table "public"."github_follows" from "authenticated";

revoke delete on table "public"."github_follows" from "service_role";

revoke insert on table "public"."github_follows" from "service_role";

revoke references on table "public"."github_follows" from "service_role";

revoke select on table "public"."github_follows" from "service_role";

revoke trigger on table "public"."github_follows" from "service_role";

revoke truncate on table "public"."github_follows" from "service_role";

revoke update on table "public"."github_follows" from "service_role";

revoke delete on table "public"."github_languages" from "anon";

revoke insert on table "public"."github_languages" from "anon";

revoke references on table "public"."github_languages" from "anon";

revoke select on table "public"."github_languages" from "anon";

revoke trigger on table "public"."github_languages" from "anon";

revoke truncate on table "public"."github_languages" from "anon";

revoke update on table "public"."github_languages" from "anon";

revoke delete on table "public"."github_languages" from "authenticated";

revoke insert on table "public"."github_languages" from "authenticated";

revoke references on table "public"."github_languages" from "authenticated";

revoke select on table "public"."github_languages" from "authenticated";

revoke trigger on table "public"."github_languages" from "authenticated";

revoke truncate on table "public"."github_languages" from "authenticated";

revoke update on table "public"."github_languages" from "authenticated";

revoke delete on table "public"."github_languages" from "service_role";

revoke insert on table "public"."github_languages" from "service_role";

revoke references on table "public"."github_languages" from "service_role";

revoke select on table "public"."github_languages" from "service_role";

revoke trigger on table "public"."github_languages" from "service_role";

revoke truncate on table "public"."github_languages" from "service_role";

revoke update on table "public"."github_languages" from "service_role";

revoke delete on table "public"."github_stars" from "anon";

revoke insert on table "public"."github_stars" from "anon";

revoke references on table "public"."github_stars" from "anon";

revoke select on table "public"."github_stars" from "anon";

revoke trigger on table "public"."github_stars" from "anon";

revoke truncate on table "public"."github_stars" from "anon";

revoke update on table "public"."github_stars" from "anon";

revoke delete on table "public"."github_stars" from "authenticated";

revoke insert on table "public"."github_stars" from "authenticated";

revoke references on table "public"."github_stars" from "authenticated";

revoke select on table "public"."github_stars" from "authenticated";

revoke trigger on table "public"."github_stars" from "authenticated";

revoke truncate on table "public"."github_stars" from "authenticated";

revoke update on table "public"."github_stars" from "authenticated";

revoke delete on table "public"."github_stars" from "service_role";

revoke insert on table "public"."github_stars" from "service_role";

revoke references on table "public"."github_stars" from "service_role";

revoke select on table "public"."github_stars" from "service_role";

revoke trigger on table "public"."github_stars" from "service_role";

revoke truncate on table "public"."github_stars" from "service_role";

revoke update on table "public"."github_stars" from "service_role";

alter table "public"."repo_summaries" drop constraint "repo_name_idx";

alter table "public"."github_activity" drop constraint "github_activity_pkey";

alter table "public"."github_followers" drop constraint "github_followers_pkey";

alter table "public"."github_follows" drop constraint "github_follows_pkey";

alter table "public"."github_languages" drop constraint "github_languages_pkey";

alter table "public"."github_stars" drop constraint "github_stars_pkey";

alter table "public"."repo_summaries" drop constraint "repo_summaries_pkey";

drop index if exists "public"."github_activity_pkey";

drop index if exists "public"."github_followers_pkey";

drop index if exists "public"."github_follows_pkey";

drop index if exists "public"."github_languages_pkey";

drop index if exists "public"."github_stars_pkey";

drop index if exists "public"."repo_name_idx";

drop index if exists "public"."repo_summaries_pkey";

drop table "public"."github_activity";

drop table "public"."github_followers";

drop table "public"."github_follows";

drop table "public"."github_languages";

drop table "public"."github_stars";

create table "public"."profiles" (
    "id" uuid not null,
    "name" text,
    "email" text,
    "image" text,
    "customer_id" text,
    "price_id" text,
    "has_access" boolean default false,
    "created_at" timestamp with time zone default (now() AT TIME ZONE 'UTC'::text),
    "updated_at" timestamp with time zone default (now() AT TIME ZONE 'UTC'::text)
);


alter table "public"."profiles" enable row level security;

alter table "public"."repo_summaries" drop column "id";

drop sequence if exists "public"."repo_summaries_id_seq";

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX repo_summaries_pkey ON public.repo_summaries USING btree (repo_name);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."repo_summaries" add constraint "repo_summaries_pkey" PRIMARY KEY using index "repo_summaries_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, name, image, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'), 
    NEW.raw_user_meta_data->>'avatar_url',
    (now() AT TIME ZONE 'UTC'), 
    (now() AT TIME ZONE 'UTC')
  );
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = (now() AT TIME ZONE 'UTC');
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

create policy "delete_own_profile_data"
on "public"."profiles"
as permissive
for delete
to public
using ((auth.uid() = id));


create policy "insert_own_profile_data"
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "read_own_profile_data"
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() = id));


create policy "update_own_profile_data"
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();


