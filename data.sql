
CREATE TABLE public.t_client
(
    nom_client character varying(40),
    email character varying(50),
    password character varying(60),
    id serial NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
        INCLUDE(email)
);
ALTER TABLE IF EXISTS public.t_client
    ADD COLUMN numero_carte character varying(30);

CREATE TABLE public.produit
(
    categorie character varying(25),
    marque character varying(40),
    prix integer,
    quantite_dispo integer,
    description character varying(50),
    id_produit serial, 
    toto CHARACTER VARCHAR(12)
    photo_produit character varying(50),
    PRIMARY KEY (id_produit)
);

CREATE TABLE public.personnel
(
    nom character varying(50),
    password character varying(35),
    profil character varying(20),
    telephone integer[],
    PRIMARY KEY (nom)
);

ALTER TABLE IF EXISTS public.t_client
    OWNER to postgres;

